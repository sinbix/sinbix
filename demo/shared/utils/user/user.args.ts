import { IAuthArgs } from '@sinbix/demo/shared/utils/auth';

export interface IUserWhereUniqueInput {
  id: number;
  email: string;
}

export interface IUserProfileCreateInput {
  firstName: string;
  lastName: string;
}

export interface IUserCreateInput {
  email: string;
  password: string;
  profile: IUserProfileCreateInput;
}

export interface IUserProfileUpdateInput {
  firstName: string;
  lastName: string;
}

export interface IUserUpdateInput {
  email: string;
  password: string;
  profile: Partial<IUserProfileUpdateInput>;
}

export interface IUsersArgs extends IAuthArgs {}

export interface IUserArgs extends IAuthArgs {
  where: Partial<IUserWhereUniqueInput>;
}

export interface IUserCreateArgs extends IAuthArgs {
  data: IUserCreateInput;
}

export interface IUserUpdateArgs extends IAuthArgs {
  data: Partial<IUserUpdateInput>;
  where: Partial<IUserWhereUniqueInput>;
}

export interface IUserDeleteArgs extends IAuthArgs {
  where: Partial<IUserWhereUniqueInput>;
}
