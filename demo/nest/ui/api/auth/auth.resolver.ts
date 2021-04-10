import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  IAuthResponse,
  ISigninGateway,
  ISignupGateway,
} from '@sinbix/demo/shared/utils/auth';
import { AUTH_CLIENT } from '@sinbix/demo/nest/utils/clients';

import { MsClient } from '@sinbix-nest/microservices';
import { Inject } from '@sinbix-nest/common';

import { Observable } from 'rxjs';
import { AuthResponse, SigninArgs, SignupArgs } from './auth.schema';

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
