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

@Resolver()
export class AuthResolver implements ISigninGateway, ISignupGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: MsClient) {}

  @Mutation((returns) => AuthToken)
  signin(@Args() args: SigninArgs): Promise<IAuthToken> {
    console.log(args, 'args');
    return this.authClient.asyncSend('signin', args);
  }

  @Mutation((returns) => AuthToken)
  signup(@Args() args: SignupArgs): Promise<IAuthToken> {
    return this.authClient.asyncSend('signup', args);
  }
}
