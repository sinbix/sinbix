import { IAuthToken } from '../../models';
import { ISignInInput, ISignUpInput } from './auth.args';

export interface IAuthGateway {
  singin(data: ISignInInput): Promise<IAuthToken>;

  signup(data: ISignUpInput): Promise<IAuthToken>;
}
