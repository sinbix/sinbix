import { Injectable } from '@nestjs/common';

import {
  IAuthGateway,
  IAuthToken,
  ISigninInput,
  ISignupInput,
  IUser,
} from '@sinbix/demo/apps/shared/utils';
import { Repository } from 'typeorm';
import { User } from '@sinbix/demo/apps/nest/server-auth-ms/db';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService implements IAuthGateway {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async getUsers(): Promise<IUser[]> {
    return [];
  }

  async signin(data: ISigninInput): Promise<IAuthToken> {
    const { email, password } = data;

    const payload = { userId: 6 };

    // const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken: 'signin token',
      expiresIn: 3600,
    };
  }

  async signup(data: ISignupInput): Promise<IAuthToken> {
    this.userRepository.save(await this.userRepository.create(data));

    return {
      accessToken: 'signup token',
      expiresIn: 3600,
    };
  }
}
