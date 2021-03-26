import { Injectable } from '@sinbix-nest/common';

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
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthService implements ISigninGateway, ISignupGateway {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private userService: UserService
  ) {}

  signin(args: ISigninArgs): Observable<IAuthToken> {
    return from(this.userRepository.findOneOrFail(args.data)).pipe(
      catchError(() => throwError(new RpcException('User is not found'))),
      map((user) => ({
        userId: user.id,
        accessToken: 'signin token',
        expiresIn: 3600,
      }))
    );
  }

  signup(args: ISignupArgs): Observable<IAuthToken> {
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
      .pipe(
        map((user) => ({
          userId: user.id,
          accessToken: 'signin token',
          expiresIn: 3600,
        }))
      );
  }
}
