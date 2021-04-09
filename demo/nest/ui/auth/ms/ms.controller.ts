import { Controller } from '@sinbix-nest/common';
import { MessagePattern, RcpCatcher } from '@sinbix-nest/microservices';

import {
  SIGNIN_VALIDATOR,
  SIGNUP_VALIDATOR,
} from '@sinbix/demo/shared/utils/auth';
import { AuthService } from '@sinbix/demo/nest/services/auth';

import { RpcValidator } from '@sinbix-nest/microservices';
import { Observable } from 'rxjs';

import type {
  IAuthArgs,
  IAuthResponse,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/shared/utils/auth';

@Controller('auth')
export class MsController implements ISigninGateway, ISignupGateway {
  constructor(private authService: AuthService) {}

  @RcpCatcher()
  @RpcValidator(SIGNIN_VALIDATOR)
  @MessagePattern('signin')
  signin(args: ISigninArgs): Observable<IAuthResponse> {
    return this.authService.signin(args);
  }

  @RcpCatcher()
  @RpcValidator(SIGNUP_VALIDATOR)
  @MessagePattern('signup')
  signup(args: ISignupArgs): Observable<IAuthResponse> {
    return this.authService.signup(args);
  }

  @RcpCatcher()
  @MessagePattern('loggedId')
  loggedIn(data) {
    return this.authService.validateToken(data.jwt);
  }

  @RcpCatcher()
  @MessagePattern('validateUser')
  validateUser(args: IAuthArgs) {
    return this.authService.validateUser(args);
  }
}
