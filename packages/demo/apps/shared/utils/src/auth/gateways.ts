import { ISigninArgs, ISignupArgs } from './args';
import { IAuthToken } from './models';

export interface ISigninGateway {
  signin(args: ISigninArgs): Promise<IAuthToken>;
}

export interface ISignupGateway {
  signup(args: ISignupArgs): Promise<IAuthToken>;
}
