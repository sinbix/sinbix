import { Controller } from '@sinbix-nest/common';
import { MessagePattern, RcpCatcher } from '@sinbix-nest/microservices';
import type {
  IAuthResponse,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/shared/types';
import { AuthService } from '@sinbix/demo/nest/services/auth';

import { RpcValidator } from '@sinbix-nest/microservices';
import { validator } from '@sinbix-common/validator';
import { Observable } from 'rxjs';

@Controller('auth')
export class MsController implements ISigninGateway, ISignupGateway {
  constructor(private authService: AuthService) {}

  @RpcValidator(
    validator.object({
      data: validator
        .object({
          email: validator
            .string()
            .email({ tlds: { allow: false } })
            .required(),
          password: validator.string().min(8).max(25).required(),
        })
        .required(),
    })
  )
  @RcpCatcher()
  @MessagePattern('signin')
  signin(args: ISigninArgs): Observable<IAuthResponse> {
    return this.authService.signin(args);
  }

  @RcpCatcher()
  @MessagePattern('signup')
  signup(args: ISignupArgs): Observable<IAuthResponse> {
    return this.authService.signup(args);
  }
}
