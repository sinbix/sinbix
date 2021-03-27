import { Injectable } from '@sinbix-nest/common';

import {
  IAuthResponse,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/types';
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

  signin(args: ISigninArgs): Observable<IAuthResponse> {
    return from(
      this.userRepository.findOneOrFail(args.data, { relations: ['profile'] })
    ).pipe(
      catchError(() => throwError(new RpcException('User is not found'))),
      map((user) => ({
        accessToken: 'signin token',
        expiresIn: 3600,
        user,
      }))
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
      .pipe(
        map((user) => ({
          accessToken: 'signin token',
          expiresIn: 3600,
          user,
        }))
      );
  }
}
