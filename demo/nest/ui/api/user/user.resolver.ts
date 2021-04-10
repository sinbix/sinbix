import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import {
  ICreateUserGateway,
  IDeleteUserGateway,
  ISafeUser,
  IUpdateUserGateway,
  IUserGateway,
  IUsersGateway,
} from '@sinbix/demo/shared/utils/user';
import { AUTH_CLIENT } from '@sinbix/demo/nest/utils/clients';
import { MsClient } from '@sinbix-nest/microservices';
import { Inject } from '@sinbix-nest/common';

import {
  SafeUser,
  UserArgs,
  UserCreateArgs,
  UserDeleteArgs,
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

  @Query((returns) => SafeUser)
  user(@Args() args: UserArgs): Observable<ISafeUser> {
    return this.authClient.send('user', args);
  }

  @Query((returns) => [SafeUser])
  users(): Observable<ISafeUser[]> {
    return this.authClient.send('users');
  }

  @Mutation((returns) => SafeUser)
  createUser(@Args() args: UserCreateArgs): Observable<ISafeUser> {
    return this.authClient.send('createUser', args);
  }

  @Mutation((returns) => SafeUser)
  updateUser(@Args() args: UserUpdateArgs): Observable<ISafeUser> {
    return this.authClient.send('updateUser', args);
  }

  @Mutation((returns) => SafeUser)
  deleteUser(@Args() args: UserDeleteArgs): Observable<ISafeUser> {
    return this.authClient.send('deleteUser', args);
  }
}
