import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ICreateUserGateway,
  IDeleteUserGateway,
  IUpdateUserGateway,
  IUser,
  IUsersGateway,
} from '@sinbix/demo/apps/shared/utils';
import { AUTH_CLIENT } from '@sinbix/demo/apps/nest/server/utils';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

import {
  User,
  UserCreateArgs,
  UserDeleteArgs,
  UserUpdateArgs,
} from './user.model';

@Resolver((of) => String)
export class UserResolver
  implements
    IUsersGateway,
    ICreateUserGateway,
    IUpdateUserGateway,
    IDeleteUserGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  @Query((returns) => [User])
  users(): Promise<IUser[]> {
    return this.authClient.send('users', []).pipe(timeout(5000)).toPromise();
  }

  @Mutation((returns) => User)
  createUser(@Args() args: UserCreateArgs): Promise<IUser> {
    return this.authClient
      .send('createUser', args)
      .pipe(timeout(5000))
      .toPromise();
  }

  @Mutation((returns) => User)
  updateUser(@Args() args: UserUpdateArgs): Promise<IUser> {
    return this.authClient
      .send('updateUser', args)
      .pipe(timeout(5000))
      .toPromise();
  }

  @Mutation((returns) => User)
  deleteUser(@Args() args: UserDeleteArgs): Promise<IUser> {
    return this.authClient
      .send('deleteUser', args)
      .pipe(timeout(5000))
      .toPromise();
  }
}
