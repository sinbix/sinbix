import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IAuthGateway,
  IAuthToken,
  ISignInInput,
  ISignUpInput,
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

  singin(data: ISignInInput): Promise<IAuthToken> {
    throw new Error('Method not implemented.');
  }

  signup(data: ISignUpInput): Promise<IAuthToken> {
    throw new Error('Method not implemented.');
  }
}
