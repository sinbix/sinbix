import { Injectable, UnauthorizedException } from '@nestjs/common';

import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';
import { Repository } from 'typeorm';
import { User } from '@sinbix/demo/apps/nest/server-auth-ms/db';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { UserService } from '../user';

@Injectable()
export class AuthService implements ISigninGateway, ISignupGateway {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UserService
  ) {}

  async signin(args: ISigninArgs): Promise<IAuthToken> {
    const user = await this.userRepository.findOne(args.data);

    if (!user) {
      // throw new UnauthorizedException('User is not found');
    }

    return {
      accessToken: 'signin token',
      expiresIn: 3600,
    };
  }

  async signup(args: ISignupArgs): Promise<IAuthToken> {
    const { email, password, firstName, lastName } = args.data;

    await this.userService.createUser({
      data: {
        email,
        password,
        profile: {
          firstName,
          lastName,
        },
      },
    });

    return {
      accessToken: 'signup token',
      expiresIn: 3600,
    };
  }
}
