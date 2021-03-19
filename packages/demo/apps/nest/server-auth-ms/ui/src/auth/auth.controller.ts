import { BadRequestException, Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { AuthService } from '@sinbix/demo/apps/nest/server-auth-ms/services';

import {
  validator,
  UnauthorizedException,
  Validator,
} from '@sinbix-nest/validator';

@Controller('auth')
export class AuthController implements ISigninGateway, ISignupGateway {
  constructor(private authService: AuthService) {}

  @Validator(
    {
      data: validator.object({
        email: validator.string().email(),
        password: validator.string().min(8).max(25),
      }),
    },
    (errors) => {
      throw new RpcException(JSON.stringify(errors));
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
