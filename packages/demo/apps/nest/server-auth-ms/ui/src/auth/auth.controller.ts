import { ArgumentsHost, Catch, Controller } from '@sinbix-nest/common';
import {
  BaseRpcExceptionFilter,
  MessagePattern,
} from '@sinbix-nest/microservices';
import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { AuthService } from '@sinbix/demo/apps/nest/server-auth-ms/services';

import { RpcValidator } from '@sinbix-nest/microservices';
import { validator } from '@sinbix-common/validator';

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
  signin(args: ISigninArgs): Promise<IAuthToken> {
    return this.authService.signin(args);
  }

  @MessagePattern('signup')
  signup(args: ISignupArgs): Promise<IAuthToken> {
    return this.authService.signup(args);
  }
}
