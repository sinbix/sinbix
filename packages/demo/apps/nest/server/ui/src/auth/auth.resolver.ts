import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  IAuthGateway,
  IAuthToken,
  IUser,
} from '@sinbix/demo/apps/shared/utils';
import { AUTH_CLIENT } from '@sinbix/demo/apps/nest/server/utils';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

import { AuthToken, SigninInput, SignupInput, User } from './auth.model';

@Resolver((of) => String)
export class AuthResolver implements IAuthGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  @Query((returns) => [User])
  async getUsers(): Promise<IUser[]> {
    return this.authClient.send('getUsers', []).pipe(timeout(5000)).toPromise();
  }

  @Mutation((returns) => AuthToken)
  signin(@Args('data') data: SigninInput): Promise<IAuthToken> {
    return this.authClient.send('signin', data).pipe(timeout(5000)).toPromise();
  }

  @Mutation((returns) => AuthToken)
  signup(@Args('data') data: SignupInput): Promise<IAuthToken> {
    return this.authClient.send('signup', data).pipe(timeout(5000)).toPromise();
  }
}
