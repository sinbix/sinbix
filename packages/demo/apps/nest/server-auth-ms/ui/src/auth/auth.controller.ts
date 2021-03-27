import { ArgumentsHost, Catch, Controller } from '@sinbix-nest/common';
import {
  BaseRpcExceptionFilter,
  MessagePattern,
} from '@sinbix-nest/microservices';
import type {
  IAuthResponse,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/types';
import { AuthService } from '@sinbix/demo/apps/nest/server-auth-ms/services';

import { RpcValidator } from '@sinbix-nest/microservices';
import { validator } from '@sinbix-common/validator';
import { Observable } from 'rxjs';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    return super.catch(exception, host);
  }
}

@Controller('auth')
export class AuthController implements ISigninGateway, ISignupGateway {
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
    }),
    { abortEarly: false }
  )
  @MessagePattern('signin')
  signin(args: ISigninArgs): Observable<IAuthResponse> {
    return this.authService.signin(args);
  }

  @MessagePattern('signup')
  signup(args: ISignupArgs): Observable<IAuthResponse> {
    return this.authService.signup(args);
  }
}
