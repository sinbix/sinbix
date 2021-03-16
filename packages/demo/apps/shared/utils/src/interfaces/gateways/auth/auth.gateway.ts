import { IAuthToken, IUser } from '../../models';
import { ISigninInput, ISignupInput } from './auth.args';

export interface IAuthGateway {
  getUsers(): Promise<IUser[]>;

  signin(data: ISigninInput): Promise<IAuthToken>;

  signup(data: ISignupInput): Promise<IAuthToken>;
}
