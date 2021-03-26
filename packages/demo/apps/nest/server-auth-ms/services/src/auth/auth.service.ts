import { Injectable, UnauthorizedException } from '@sinbix-nest/common';

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
import { RpcException } from '@sinbix-nest/microservices';

@Injectable()
export class AuthService implements ISigninGateway, ISignupGateway {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UserService
  ) {}

  async signin(args: ISigninArgs): Promise<IAuthToken> {
    const user = await this.userRepository.findOne(args.data);

    if (!user) {
      throw new RpcException('User is not found');
    }

    return {
      userId: user.id,
      accessToken: 'signin token',
      expiresIn: 3600,
    };
  }

  async signup(args: ISignupArgs): Promise<IAuthToken> {
    const { email, password, firstName, lastName } = args.data;

    const user = await this.userService.createUser({
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
      userId: user.id,
      accessToken: 'signup token',
      expiresIn: 3600,
    };
  }
}
