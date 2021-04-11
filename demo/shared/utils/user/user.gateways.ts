import { Observable } from 'rxjs';
import {
  IUserArgs,
  IUserCreateArgs,
  IUserDeleteArgs,
  IUsersArgs,
  IUserUpdateArgs,
} from './user.args';
import { ISafeUser } from './user.models';

export interface IUserGateway {
  user(args: IUserArgs): Observable<ISafeUser>;
}

export interface IUsersGateway {
  users(args: IUsersArgs): Observable<ISafeUser[]>;
}

export interface ICreateUserGateway {
  createUser(args: IUserCreateArgs): Observable<ISafeUser>;
}

export interface IUpdateUserGateway {
  updateUser(args: IUserUpdateArgs): Observable<ISafeUser>;
}

export interface IDeleteUserGateway {
  deleteUser(args: IUserDeleteArgs): Observable<ISafeUser>;
}
