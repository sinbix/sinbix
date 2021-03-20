import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  IAuthToken,
  ISigninGateway,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { AUTH_CLIENT } from '@sinbix/demo/apps/nest/server/utils';

import { ClientProxy } from '@sinbix-nest/microservices';
import { HttpValidator, Inject } from '@sinbix-nest/common';
import { validator } from '@sinbix-common/validator';

import { timeout } from 'rxjs/operators';
import { AuthToken, SigninArgs, SignupArgs } from './auth.model';

@Resolver((of) => String)
export class AuthResolver implements ISigninGateway, ISignupGateway {
  constructor(@Inject(AUTH_CLIENT) private readonly authClient: ClientProxy) {}

  @HttpValidator({
    data: validator.object({
      email: validator.string().email(),
      password: validator.string().min(8).max(25),
    }),
  })
  @Mutation((returns) => AuthToken)
  signin(@Args() args: SigninArgs): Promise<IAuthToken> {
    return this.authClient.send('signin', args).pipe(timeout(5000)).toPromise();
  }

  @Mutation((returns) => AuthToken)
  signup(@Args() args: SignupArgs): Promise<IAuthToken> {
    return this.authClient.send('signup', args).pipe(timeout(5000)).toPromise();
  }
}
