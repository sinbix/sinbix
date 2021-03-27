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

export interface IUserArgs {
  where: Partial<IUserWhereUniqueInput>;
}

export interface IUserCreateArgs {
  data: IUserCreateInput;
}

export interface IUserUpdateArgs {
  data: Partial<IUserUpdateInput>;
  where: Partial<IUserWhereUniqueInput>;
}

export interface IUserDeleteArgs {
  where: Partial<IUserWhereUniqueInput>;
}
