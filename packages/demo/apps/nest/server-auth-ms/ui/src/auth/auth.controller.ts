import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IAuthGateway,
  IAuthToken,
  ISigninInput,
  ISignupInput,
  IUser,
} from '@sinbix/demo/apps/shared/utils';
import { AuthService } from '@sinbix/demo/apps/nest/server-auth-ms/services';

@Controller('auth')
export class AuthController implements IAuthGateway {
  constructor(private authService: AuthService) {}

  @MessagePattern('getUsers')
  getUsers(): Promise<IUser[]> {
    return this.authService.getUsers();
  }

  @MessagePattern('signin')
  signin(data: ISigninInput): Promise<IAuthToken> {
    return this.authService.signin(data);
  }

  @MessagePattern('signup')
  signup(data: ISignupInput): Promise<IAuthToken> {
    return this.authService.signup(data);
  }
}
