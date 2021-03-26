import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  IAuthToken,
  ISigninGateway,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { AUTH_CLIENT } from '@sinbix/demo/apps/nest/server/utils';

import { MsClient } from '@sinbix-nest/microservices';
import { Inject } from '@sinbix-nest/common';

import { AuthToken, SigninArgs, SignupArgs } from './auth.model';
import { Observable } from 'rxjs';

@Resolver()
export class AuthResolver implements ISigninGateway, ISignupGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: MsClient) {}

  @Mutation((returns) => AuthToken)
  signin(@Args() args: SigninArgs): Observable<IAuthToken> {
    return this.authClient.send('signin', args);
  }

  @Mutation((returns) => AuthToken)
  signup(@Args() args: SignupArgs): Observable<IAuthToken> {
    return this.authClient.send('signup', args);
  }
}
