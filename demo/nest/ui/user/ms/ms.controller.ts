import { Controller } from '@sinbix-nest/common';

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

  @RpcValidator(
    validator.object({
      where: validator
        .object({
          email: validator.string().email({ tlds: { allow: false } }),
          id: validator.number().integer(),
        })
        .min(1)
        .required(),
    })
  )
  @RcpCatcher()
  @MessagePattern('user')
  user(@Payload() args: IUserArgs): Observable<ISafeUser> {
    return this.userService.user(args);
  }

  @RcpCatcher()
  @MessagePattern('users')
  users(): Observable<ISafeUser[]> {
    return this.userService.users();
  }

  @RcpCatcher()
  @MessagePattern('createUser')
  createUser(args: IUserCreateArgs): Observable<ISafeUser> {
    return this.userService.createUser(args);
  }

  @RcpCatcher()
  @MessagePattern('updateUser')
  updateUser(args: IUserUpdateArgs): Observable<ISafeUser> {
    return this.userService.updateUser(args);
  }

  @RpcValidator(
    validator.object({
      where: validator
        .object({
          email: validator.string().email({ tlds: { allow: false } }),
          id: validator.number().integer(),
        })
        .min(1)
        .required(),
    })
  )
  @RcpCatcher()
  @MessagePattern('deleteUser')
  deleteUser(args: IUserDeleteArgs): Observable<ISafeUser> {
    return this.userService.deleteUser(args);
  }
}
