import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import type {
  ICreateUserGateway,
  IDeleteUserGateway,
  ISafeUser,
  IUpdateUserGateway,
  IUserGateway,
  IUsersArgs,
  IUsersGateway,
} from '@sinbix/demo/shared/utils/user';
import { AuthJwtGqlGuard, AUTH_CLIENT } from '@sinbix/demo/nest/utils/clients';
import { MsClient } from '@sinbix-nest/microservices';
import { Inject, UseGuards } from '@sinbix-nest/common';

import {
  SafeUser,
  UserArgs,
  UserCreateArgs,
  UserDeleteArgs,
  UsersArgs,
  UserUpdateArgs,
} from './user.schema';

@Resolver()
export class UserResolver
  implements
    IUserGateway,
    IUsersGateway,
    ICreateUserGateway,
    IUpdateUserGateway,
    IDeleteUserGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: MsClient) {}

  @Query((returns) => [SafeUser])
  @UseGuards(AuthJwtGqlGuard)
  users(@Args() args: UsersArgs): Observable<ISafeUser[]> {
    return this.authClient.send('users', args);
  }

  @Query((returns) => SafeUser)
  @UseGuards(AuthJwtGqlGuard)
  user(@Args() args: UserArgs): Observable<ISafeUser> {
    return this.authClient.send('user', args);
  }

  @Mutation((returns) => SafeUser)
  @UseGuards(AuthJwtGqlGuard)
  createUser(@Args() args: UserCreateArgs): Observable<ISafeUser> {
    return this.authClient.send('createUser', args);
  }

  @Mutation((returns) => SafeUser)
  @UseGuards(AuthJwtGqlGuard)
  updateUser(@Args() args: UserUpdateArgs): Observable<ISafeUser> {
    return this.authClient.send('updateUser', args);
  }

  @Mutation((returns) => SafeUser)
  @UseGuards(AuthJwtGqlGuard)
  deleteUser(@Args() args: UserDeleteArgs): Observable<ISafeUser> {
    return this.authClient.send('deleteUser', args);
  }
}
