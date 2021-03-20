import { Injectable } from '@sinbix-nest/common';

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

import { Repository } from 'typeorm';
import { User, UserProfile } from '@sinbix/demo/apps/nest/server-auth-ms/db';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

@Injectable()
export class UserService
  implements
    IUsersGateway,
    ICreateUserGateway,
    IUpdateUserGateway,
    IDeleteUserGateway {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>
  ) {}

  async createUser(args: IUserCreateArgs): Promise<IUser> {
    const { email, password, profile } = args.data;

    return this.userRepository.save(
      await this.userRepository.create({
        email,
        password,
        profile: await this.profileRepository.save(
          await this.profileRepository.create(profile)
        ),
      })
    );
  }

  async updateUser(args: IUserUpdateArgs): Promise<IUser> {
    return this.userRepository
      .findOneOrFail(args.where, {
        relations: ['profile'],
      })
      .then(async (user) => {
        return this.userRepository.save(
          _.assign(user, args.data, {
            profile: await this.profileRepository.save(
              _.assign(user.profile, args.data.profile)
            ),
          })
        );
      });
  }

  async users(): Promise<IUser[]> {
    return this.userRepository.find({ relations: ['profile'] });
  }

  async deleteUser(args: IUserDeleteArgs): Promise<IUser> {
    return this.userRepository
      .findOneOrFail(args.where, {
        relations: ['profile'],
      })
      .then(async (user) => {
        await this.userRepository.delete(user.id);
        return user;
      });
  }
}
