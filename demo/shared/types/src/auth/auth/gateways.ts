import { Observable } from 'rxjs';
import { ISigninArgs, ISignupArgs } from './args';
import { IAuthResponse } from './models';

export interface ISigninGateway {
  signin(args: ISigninArgs): Observable<IAuthResponse>;
}

export interface ISignupGateway {
  signup(args: ISignupArgs): Observable<IAuthResponse>;
}
