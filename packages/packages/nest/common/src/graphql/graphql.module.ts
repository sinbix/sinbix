import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as _ from 'lodash';

@Module({})
export class GraphqlModule {
  static forRoot(...modules: any[]) {
    return {
      module: GraphqlModule,
      imports: [
        GraphQLModule.forRoot({
          include: modules,
          autoSchemaFile: true,
          context: ({ req }) => ({ req }),
          formatError: (err) => {
            let message = err.message;

            const badMessage =
              'Unexpected error value: { status: "error", message: "';

            if (message.includes(badMessage)) {
              message = message
                .replace(badMessage, '')
                .slice(0, -3)
                .replace(/(\\")/g, '"')
                .replace(/(\\\\")/g, '\\"');
            }

            const exception = _.get(err, 'extensions.exception');

            return {
              message,
              path: _.get(err, 'path'),
              extensions: {
                code: _.get(err, 'extensions.code'),
                exception: {
                  status: _.get(exception, 'status'),
                  response: _.get(exception, 'response'),
                },
              },
            };
          },
        }),
        ...modules,
      ],
    };
  }
}
