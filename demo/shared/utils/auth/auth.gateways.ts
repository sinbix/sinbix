import { Observable } from 'rxjs';
import { ISigninArgs, ISignupArgs } from './auth.args';
import { IAuthResponse } from './auth.models';

export interface ISigninGateway {
  signin(args: ISigninArgs): Observable<IAuthResponse>;
}

export interface ISignupGateway {
  signup(args: ISignupArgs): Observable<IAuthResponse>;
}
