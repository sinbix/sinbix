import { Controller } from '@sinbix-nest/common';

import {
  CREATE_USER_VALIDATOR,
  UPDATE_USER_VALIDATOR,
  WHERE_USER_UNIQUE_VALIDATOR,
} from '@sinbix/demo/shared/utils/user';

import type {
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
import { validator } from '@sinbix-common/validator';

@Controller('user')
export class MsController
  implements
    IUserGateway,
    IUsersGateway,
    ICreateUserGateway,
    IUpdateUserGateway,
    IDeleteUserGateway {
  constructor(private userService: UserService) {}

  @RcpCatcher()
  @MessagePattern('users')
  users(): Observable<ISafeUser[]> {
    return this.userService.users();
  }

  @RcpCatcher()
  @RpcValidator(WHERE_USER_UNIQUE_VALIDATOR)
  @MessagePattern('user')
  user(@Payload() args: IUserArgs): Observable<ISafeUser> {
    return this.userService.user(args);
  }

  @RcpCatcher()
  @RpcValidator(CREATE_USER_VALIDATOR)
  @MessagePattern('createUser')
  createUser(args: IUserCreateArgs): Observable<ISafeUser> {
    return this.userService.createUser(args);
  }

  @RcpCatcher()
  @RpcValidator(UPDATE_USER_VALIDATOR)
  @MessagePattern('updateUser')
  updateUser(args: IUserUpdateArgs): Observable<ISafeUser> {
    return this.userService.updateUser(args);
  }

  @RpcValidator(WHERE_USER_UNIQUE_VALIDATOR)
  @RcpCatcher()
  @MessagePattern('deleteUser')
  deleteUser(args: IUserDeleteArgs): Observable<ISafeUser> {
    return this.userService.deleteUser(args);
  }
}
