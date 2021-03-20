import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  Controller,
  RpcExceptionFilter,
  UseFilters,
} from '@nestjs/common';
import {
  BaseRpcExceptionFilter,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { AuthService } from '@sinbix/demo/apps/nest/server-auth-ms/services';

import { RpcValidator, validator } from '@sinbix-nest/validator';

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
    {
      data: validator
        .object({
          email: validator.string().email().required(),
          password: validator.string().min(8).max(25).required(),
        })
        .required(),
    },
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
