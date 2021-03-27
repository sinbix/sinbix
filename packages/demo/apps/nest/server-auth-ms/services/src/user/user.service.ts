import { Injectable } from '@sinbix-nest/common';

import {
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
} from '@sinbix/demo/apps/shared/utils';

import { Repository } from 'typeorm';
import { User, UserProfile } from '@sinbix/demo/apps/nest/server-auth-ms/db';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
import { getManager } from 'typeorm';

@Injectable()
export class UserService
  implements
    IUserGateway,
    IUsersGateway,
    ICreateUserGateway,
    IUpdateUserGateway,
    IDeleteUserGateway {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>
  ) {}

  user(args: IUserArgs): Observable<ISafeUser> {
    return from(
      this.userRepository.findOneOrFail(args.where, { relations: ['profile'] })
    );
  }

  users(): Observable<ISafeUser[]> {
    return from(this.userRepository.find({ relations: ['profile'] }));
  }

  createUser(args: IUserCreateArgs): Observable<ISafeUser> {
    return from(
      getManager().transaction((manager) => {
        const { email, password, profile } = args.data;
        return manager
          .save(
            this.userRepository.create({
              email,
              password,
            })
          )
          .then(async (user) => ({
            ...user,
            profile: await manager.save(
              this.profileRepository.create({ user, ...profile })
            ),
          }));
      })
    );
  }

  updateUser(args: IUserUpdateArgs): Observable<ISafeUser> {
    return from(
      getManager().transaction((manager) =>
        this.userRepository
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
          })
      )
    );
  }

  deleteUser(args: IUserDeleteArgs): Observable<ISafeUser> {
    return from(
      this.userRepository
        .findOneOrFail(args.where, {
          relations: ['profile'],
        })
        .then(async (user) => {
          await this.userRepository.delete(user.id);
          return user;
        })
    );
  }
}
