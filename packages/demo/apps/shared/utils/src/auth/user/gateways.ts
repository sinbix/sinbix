import { Observable } from 'rxjs';
import { IUserCreateArgs, IUserDeleteArgs, IUserUpdateArgs } from './args';
import { IUser } from './models';

export interface IUsersGateway {
  users(): Observable<IUser[]>;
}

export interface ICreateUserGateway {
  createUser(args: IUserCreateArgs): Observable<IUser>;
}

export interface IUpdateUserGateway {
  updateUser(args: IUserUpdateArgs): Observable<IUser>;
}

export interface IDeleteUserGateway {
  deleteUser(args: IUserDeleteArgs): Observable<IUser>;
}
