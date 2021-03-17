import { Injectable } from '@nestjs/common';

import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { Repository } from 'typeorm';
import { User, UserProfile } from '@sinbix/demo/apps/nest/server-auth-ms/db';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';

@Injectable()
export class AuthService implements ISigninGateway, ISignupGateway {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>
  ) {}

  async signin(args: ISigninArgs): Promise<IAuthToken> {
    const { email, password } = args.data;

    const payload = { userId: 6 };

    return {
      accessToken: 'signin token',
      expiresIn: 3600,
    };
  }

  async signup(args: ISignupArgs): Promise<IAuthToken> {
    const { email, password, firstName, lastName } = data;

    await this.profileRepository.save(
      await this.profileRepository.create({
        firstName,
        lastName,
        user: await this.userRepository.save(
          await this.userRepository.create({ email, password })
        ),
      })
    );

    return {
      accessToken: 'signup token',
      expiresIn: 3600,
    };
  }
}
