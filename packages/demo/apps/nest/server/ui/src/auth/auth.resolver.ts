import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  IAuthGateway,
  IAuthToken,
  ISignInInput,
  ISignUpInput,
  IUser,
} from '@sinbix/demo/apps/shared/utils';
import { AUTH_CLIENT } from '@sinbix/demo/apps/nest/server/utils';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

import { User } from './auth.model';

@Resolver((of) => String)
export class AuthResolver implements IAuthGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  @Query((returns) => [User])
  async getUsers(): Promise<IUser[]> {
    return this.authClient.send('getUsers', []).pipe(timeout(5000)).toPromise();
  }

  singin(data: ISignInInput): Promise<IAuthToken> {
    throw new Error('Method not implemented.');
  }
  signup(data: ISignUpInput): Promise<IAuthToken> {
    throw new Error('Method not implemented.');
  }
}
