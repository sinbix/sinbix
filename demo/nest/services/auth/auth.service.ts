import { Injectable } from '@sinbix-nest/common';

import type {
  IAuthResponse,
  IAuthArgs,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/shared/utils/auth';

import type { ISafeUser } from '@sinbix/demo/shared/utils/user';

import { Repository } from 'typeorm';
import { User } from '@sinbix/demo/nest/db/auth';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user';
import { EXPIRES_IN, JwtPayload } from './jwt';

@Injectable()
export class AuthService implements ISigninGateway, ISignupGateway {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService // private jwtStrategy: JwtStrategy
  ) {}

  signin(args: ISigninArgs): Observable<IAuthResponse> {
    const { email, password } = args.data;

    return from(
      this.userRepository
        .findOneOrFail(
          { email },
          {
            relations: ['profile'],
            select: ['id', 'email', 'password'],
          }
        )
        .then(async (user) => {
          if (!(await user.validatePassword(password))) {
            throw new Error('Incorrect password');
          }
          delete user.password;
          return this.signToken(user);
        })
    );
  }

  signup(args: ISignupArgs): Observable<IAuthResponse> {
    const { email, password, firstName, lastName } = args.data;

    return this.userService
      .createUser({
        data: {
          email,
          password,
          profile: {
            firstName,
            lastName,
          },
        },
      })
      .pipe(switchMap((user) => this.signToken(user)));
  }

  validateToken(jwt: string) {
    try {
      return this.jwtService.verify(jwt);
    } catch {
      return false;
    }
  }

  validateUser(args: IAuthArgs) {
    try {
      const jwt = args.auth?.jwt;
      if (this.jwtService.verify(jwt)) {
        const userId = (this.jwtService.decode(jwt) as JwtPayload)?.userId;

        if (userId) {
          return this.userService.user({
            where: {
              id: userId,
            },
          });
        }
      }
    } catch {
      return null;
    }
  }

  private async signToken(user: ISafeUser): Promise<IAuthResponse> {
    const payload: JwtPayload = { userId: user.id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, expiresIn: EXPIRES_IN, user };
  }
}
