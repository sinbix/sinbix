import { IUserCreateArgs, IUserDeleteArgs, IUserUpdateArgs } from './args';
import { IUser } from './models';

export interface IUsersGateway {
  users(): Promise<IUser[]>;
}

export interface ICreateUserGateway {
  createUser(args: IUserCreateArgs): Promise<IUser>;
}

export interface IUpdateUserGateway {
  updateUser(args: IUserUpdateArgs): Promise<IUser>;
}

export interface IDeleteUserGateway {
  deleteUser(args: IUserDeleteArgs): Promise<IUser>;
}
