import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  IAuthResponse,
  ISigninGateway,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/types';
import { AUTH_CLIENT } from '@sinbix/demo/apps/nest/server/utils';

import { MsClient } from '@sinbix-nest/microservices';
import { Inject } from '@sinbix-nest/common';

import { AuthResponse, SigninArgs, SignupArgs } from './auth.model';
import { Observable } from 'rxjs';

@Resolver()
export class AuthResolver implements ISigninGateway, ISignupGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: MsClient) {}

  @Mutation((returns) => AuthResponse)
  signin(@Args() args: SigninArgs): Observable<IAuthResponse> {
    return this.authClient.send('signin', args);
  }

  @Mutation((returns) => AuthResponse)
  signup(@Args() args: SignupArgs): Observable<IAuthResponse> {
    return this.authClient.send('signup', args);
  }
}
