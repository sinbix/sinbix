import { IUserDeleteArgs } from './args';
import { IUser } from './models';

export interface IUsersGateway {
  users(): Promise<IUser[]>;
}

export interface IDeleteUserGateway {
  deleteUser(args: IUserDeleteArgs): Promise<IUser>;
}
