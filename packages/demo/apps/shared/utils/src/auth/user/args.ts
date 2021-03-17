export interface IUserWhereUniqueInput {
  id: number;
  email: string;
}

export interface IUserDeleteArgs {
  where: IUserWhereUniqueInput;
}
