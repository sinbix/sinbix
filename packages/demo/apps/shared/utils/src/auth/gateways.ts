import { Observable } from 'rxjs';
import { ISigninArgs, ISignupArgs } from './args';
import { IAuthToken } from './models';

export interface ISigninGateway {
  signin(args: ISigninArgs): Observable<IAuthToken>;
}

export interface ISignupGateway {
  signup(args: ISignupArgs): Observable<IAuthToken>;
}
