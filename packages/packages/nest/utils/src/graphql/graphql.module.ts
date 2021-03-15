import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

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
            return {
              message: err.message,
            };
          },
        }),
        ...modules,
      ],
    };
  }
}
