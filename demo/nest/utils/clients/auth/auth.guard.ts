import { GqlExecutionContext } from '@nestjs/graphql';
import {
  applyDecorators,
  ArgumentMetadata,
  CallHandler,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  PipeTransform,
  UseInterceptors,
  UsePipes,
} from '@sinbix-nest/common';
import { MsClient } from '@sinbix-nest/microservices';
import { Observable } from 'rxjs';
import { AUTH_CLIENT } from './auth.constants';
import * as _ from 'lodash';

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

@Injectable()
export class AuthJwtGqlInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);

    const { req } = ctx.getContext();

    const args = ctx.getArgs();

    _.set(args, 'auth.jwt', req.headers['authorization']?.split(' ')[1]);

    return next.handle();
  }
}

export function AuthJwtGql() {
  return applyDecorators(UseInterceptors(new AuthJwtGqlInterceptor()));
}
