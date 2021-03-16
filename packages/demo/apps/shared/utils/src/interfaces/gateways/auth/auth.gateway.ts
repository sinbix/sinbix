import { IAuthToken, IUser } from '../../models';
import { ISignInInput, ISignUpInput } from './auth.args';

export interface IAuthGateway {
  getUsers(): Promise<IUser[]>;

  singin(data: ISignInInput): Promise<IAuthToken>;

  signup(data: ISignUpInput): Promise<IAuthToken>;
}
