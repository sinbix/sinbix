import { Injectable } from '@angular/core';
import {
  IAuthToken,
  ISigninArgs,
  ISigninGateway,
  ISignupArgs,
  ISignupGateway,
} from '@sinbix/demo/apps/shared/utils';

@Injectable({ providedIn: 'root' })
export class AuthService implements ISigninGateway, ISignupGateway {
  signup(args: ISignupArgs): Promise<IAuthToken> {
    throw new Error('Method not implemented.');
  }
  signin(args: ISigninArgs): Promise<IAuthToken> {
    console.log(args, 'signin');
    return null;
  }
}
