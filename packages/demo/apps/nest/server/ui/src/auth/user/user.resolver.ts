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

@Resolver()
export class UserResolver
  implements
    IUsersGateway,
    ICreateUserGateway,
    IUpdateUserGateway,
    IDeleteUserGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: MsClient) {}

  @Query((returns) => [User])
  users(): Promise<IUser[]> {
    return this.authClient.asyncSend('users');
  }

  @Mutation((returns) => User)
  createUser(@Args() args: UserCreateArgs): Promise<IUser> {
    return this.authClient.asyncSend('createUser', args);
  }

  @Mutation((returns) => User)
  updateUser(@Args() args: UserUpdateArgs): Promise<IUser> {
    return this.authClient.asyncSend('updateUser', args);
  }

  @Mutation((returns) => User)
  deleteUser(@Args() args: UserDeleteArgs): Promise<IUser> {
    return this.authClient.asyncSend('deleteUser', args);
  }
}
