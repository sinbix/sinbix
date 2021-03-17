import { Injectable } from '@nestjs/common';

import {
  IDeleteUserGateway,
  IUser,
  IUserDeleteArgs,
  IUsersGateway,
} from '@sinbix/demo/apps/shared/utils';
import { Repository } from 'typeorm';
import { User } from '@sinbix/demo/apps/nest/server-auth-ms/db';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

@Injectable()
export class UserService implements IUsersGateway, IDeleteUserGateway {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async users(): Promise<IUser[]> {
    return this.userRepository.find({ relations: ['profile'] });
  }

  async deleteUser(args: IUserDeleteArgs): Promise<IUser> {
    const user = await this.userRepository.findOneOrFail(args.where);

    await this.userRepository.delete(user.id);

    return user;
  }
}
