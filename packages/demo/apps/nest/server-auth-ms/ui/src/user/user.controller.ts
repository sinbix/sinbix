import { Controller } from '@sinbix-nest/common';

import {
  ICreateUserGateway,
  IDeleteUserGateway,
  IUpdateUserGateway,
  IUser,
  IUserCreateArgs,
  IUserDeleteArgs,
  IUsersGateway,
  IUserUpdateArgs,
} from '@sinbix/demo/apps/shared/utils';
import { UserService } from '@sinbix/demo/apps/nest/server-auth-ms/services';
import { MessagePattern } from '@sinbix-nest/microservices';

@Controller('user')
export class UserController
  implements
    IUsersGateway,
    ICreateUserGateway,
    IUpdateUserGateway,
    IDeleteUserGateway {
  constructor(private userService: UserService) {}

  @MessagePattern('users')
  users(): Promise<IUser[]> {
    return this.userService.users();
  }

  @MessagePattern('createUser')
  createUser(args: IUserCreateArgs): Promise<IUser> {
    return this.userService.createUser(args);
  }

  @MessagePattern('updateUser')
  updateUser(args: IUserUpdateArgs): Promise<IUser> {
    return this.userService.updateUser(args);
  }

  @MessagePattern('deleteUser')
  deleteUser(args: IUserDeleteArgs): Promise<IUser> {
    return this.userService.deleteUser(args);
  }
}
