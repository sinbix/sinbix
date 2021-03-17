import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  IDeleteUserGateway,
  IUser,
  IUsersGateway,
} from '@sinbix/demo/apps/shared/utils';
import { AUTH_CLIENT } from '@sinbix/demo/apps/nest/server/utils';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

import { User, UserDeleteArgs } from './user.model';

@Resolver((of) => String)
export class UserResolver implements IUsersGateway, IDeleteUserGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  @Query((returns) => [User])
  users(): Promise<IUser[]> {
    return this.authClient.send('users', []).pipe(timeout(5000)).toPromise();
  }

  @Mutation((returns) => User)
  deleteUser(@Args() args: UserDeleteArgs): Promise<IUser> {
    return this.authClient
      .send('deleteUser', args)
      .pipe(timeout(5000))
      .toPromise();
  }
}
