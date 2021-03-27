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
} from '@sinbix/demo/apps/shared/types';
import { UserService } from '@sinbix/demo/apps/nest/server-auth-ms/services';
import {
  MessagePattern,
  Payload,
  RpcValidator,
} from '@sinbix-nest/microservices';
import { Observable } from 'rxjs';
import { validator } from '@sinbix-common/validator';

@Controller('user')
export class UserController
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
    }),
    { abortEarly: false }
  )
  @MessagePattern('user')
  user(@Payload() args: IUserArgs): Observable<ISafeUser> {
    return this.userService.user(args);
  }

  @MessagePattern('users')
  users(): Observable<ISafeUser[]> {
    return this.userService.users();
  }

  @MessagePattern('createUser')
  createUser(args: IUserCreateArgs): Observable<ISafeUser> {
    return this.userService.createUser(args);
  }

  @MessagePattern('updateUser')
  updateUser(args: IUserUpdateArgs): Observable<ISafeUser> {
    return this.userService.updateUser(args);
  }

  @MessagePattern('deleteUser')
  deleteUser(args: IUserDeleteArgs): Observable<ISafeUser> {
    return this.userService.deleteUser(args);
  }
}
