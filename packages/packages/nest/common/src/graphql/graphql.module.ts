import { GraphQLModule } from '@nestjs/graphql';
import * as _ from 'lodash';

export class GraphqlModule {
  static forRoot(...modules: any[]) {
    return {
      module: GraphqlModule,
      imports: [
        GraphQLModule.forRoot({
          include: modules,
          autoSchemaFile: true,
          formatError: (err) => {
            return _.get(err, 'extensions.exception.response');
          },
        }),
        ...modules,
      ],
    };
  }
}
