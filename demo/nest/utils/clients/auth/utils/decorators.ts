import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const JwtGqlToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext();

    return req.headers['authorization']?.split(' ')?.[1];
  }
);

export const GqlUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext();

    return req?.user;
  }
);

export const MsUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToRpc().getData();

    return req?.user;
  }
);
