import { Controller } from '@nestjs/common';

import {
  IDeleteUserGateway,
  IUser,
  IUserDeleteArgs,
  IUsersGateway,
} from '@sinbix/demo/apps/shared/utils';
import { UserService } from '@sinbix/demo/apps/nest/server-auth-ms/services';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController implements IUsersGateway, IDeleteUserGateway {
  constructor(private userService: UserService) {}

  @MessagePattern('users')
  users(): Promise<IUser[]> {
    return this.userService.users();
  }

  @MessagePattern('deleteUser')
  deleteUser(args: IUserDeleteArgs): Promise<IUser> {
    return this.userService.deleteUser(args);
  }
}
