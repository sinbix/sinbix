import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ICreateUserGateway,
  IDeleteUserGateway,
  IUpdateUserGateway,
  IUser,
  IUsersGateway,
} from '@sinbix/demo/apps/shared/utils';
import { AUTH_CLIENT } from '@sinbix/demo/apps/nest/server/utils';
import { MsClient } from '@sinbix-nest/microservices';
import { Inject } from '@sinbix-nest/common';

import {
  User,
  UserCreateArgs,
  UserDeleteArgs,
  UserUpdateArgs,
} from './user.model';
import { Observable } from 'rxjs';

@Resolver()
export class UserResolver
  implements
    IUsersGateway,
    ICreateUserGateway,
    IUpdateUserGateway,
    IDeleteUserGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: MsClient) {}

  @Query((returns) => [User])
  users(): Observable<IUser[]> {
    return this.authClient.send('users');
  }

  @Mutation((returns) => User)
  createUser(@Args() args: UserCreateArgs): Observable<IUser> {
    return this.authClient.send('createUser', args);
  }

  @Mutation((returns) => User)
  updateUser(@Args() args: UserUpdateArgs): Observable<IUser> {
    return this.authClient.send('updateUser', args);
  }

  @Mutation((returns) => User)
  deleteUser(@Args() args: UserDeleteArgs): Observable<IUser> {
    return this.authClient.send('deleteUser', args);
  }
}
