import { GqlExecutionContext } from '@nestjs/graphql';
import { CanActivate, ExecutionContext, Inject } from '@sinbix-nest/common';
import { MsClient } from '@sinbix-nest/microservices';
import { AUTH_CLIENT } from './auth.constants';
import * as _ from 'lodash';

export class AuthJwtGqlGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext();

    const jwt = req.headers['authorization']?.split(' ')?.[1];

    if (jwt) {
      const args = ctx.getArgs();

      _.set(args, 'auth.jwt', jwt);

      return true;
    }

    return false;
  }
}

export class AuthGqlGuard implements CanActivate {
  constructor(
    @Inject(AUTH_CLIENT)
    private readonly client: MsClient
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext();

    const args = ctx.getArgs();

    const user = await this.client
      .send('validateUser', {
        auth: {
          jwt: args.auth?.jwt,
        },
      })
      .toPromise();

    if (user) {
      req.user = user;

      return true;
    }

    return false;
  }
}

export class AuthMsGuard implements CanActivate {
  constructor(
    @Inject(AUTH_CLIENT)
    private readonly client: MsClient
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const args = context.switchToRpc().getData();

    const user = await this.client
      .send('validateUser', {
        auth: {
          jwt: args.auth?.jwt,
        },
      })
      .toPromise();

    if (user) {
      args.auth.user = user;

      return true;
    }

    return false;
  }
}

export class AdminMsGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const args = context.switchToRpc().getData();

    // console.log(args);

    if (args.auth?.jwt == 'admin') {
      return true;
    }

    return false;
  }
}
