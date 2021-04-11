import { Controller, UseGuards } from '@sinbix-nest/common';

import {
  CREATE_USER_VALIDATOR,
  DELETE_USER_VALIDATOR,
  UPDATE_USER_VALIDATOR,
  USER_VALIDATOR,
} from '@sinbix/demo/shared/utils/user';

import type {
  IUsersArgs,
  ICreateUserGateway,
  IDeleteUserGateway,
  ISafeUser,
  IUpdateUserGateway,
  IUserArgs,
  IUserCreateArgs,
  IUserDeleteArgs,
  IUserGateway,
  IUsersGateway,
  IUserUpdateArgs,
} from '@sinbix/demo/shared/utils/user';

import { UserService } from '@sinbix/demo/nest/services/user';
import {
  MessagePattern,
  Payload,
  RcpCatcher,
  RpcValidator,
} from '@sinbix-nest/microservices';

import { Observable } from 'rxjs';
import { AdminMsGuard } from '@sinbix/demo/nest/utils/clients';

@Controller('user')
export class UserController
  implements
    IUserGateway,
    IUsersGateway,
    ICreateUserGateway,
    IUpdateUserGateway,
    IDeleteUserGateway {
  constructor(private userService: UserService) {}

  @RcpCatcher()
  @UseGuards(AdminMsGuard)
  @MessagePattern('users')
  users(args: IUsersArgs): Observable<ISafeUser[]> {
    return this.userService.users();
  }

  @RcpCatcher()
  @UseGuards(AdminMsGuard)
  @RpcValidator(USER_VALIDATOR)
  @MessagePattern('user')
  user(@Payload() args: IUserArgs): Observable<ISafeUser> {
    return this.userService.user(args);
  }

  @RcpCatcher()
  @UseGuards(AdminMsGuard)
  @RpcValidator(CREATE_USER_VALIDATOR)
  @MessagePattern('createUser')
  createUser(args: IUserCreateArgs): Observable<ISafeUser> {
    return this.userService.createUser(args);
  }

  @RcpCatcher()
  @UseGuards(AdminMsGuard)
  @RpcValidator(UPDATE_USER_VALIDATOR)
  @MessagePattern('updateUser')
  updateUser(args: IUserUpdateArgs): Observable<ISafeUser> {
    return this.userService.updateUser(args);
  }

  @RcpCatcher()
  @UseGuards(AdminMsGuard)
  @RpcValidator(DELETE_USER_VALIDATOR)
  @MessagePattern('deleteUser')
  deleteUser(args: IUserDeleteArgs): Observable<ISafeUser> {
    return this.userService.deleteUser(args);
  }
}
