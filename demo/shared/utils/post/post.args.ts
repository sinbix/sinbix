import { IAuthArgs } from '@sinbix/demo/shared/utils/auth';

export interface IPostCreateInput {
  title: string;

  content: string;
}

export interface IPostWhereUniqueInput {
  id: string;
}

export interface IPostUpdateInput {
  title: string;

  content: string;
}

export interface IPostCreateArgs extends IAuthArgs {
  data: IPostCreateInput;
}

export interface IPostUpdateArgs extends IAuthArgs {
  data: IPostUpdateInput;

  where: IPostWhereUniqueInput;
}

export interface IPostDeleteArgs extends IAuthArgs {
  where: IPostWhereUniqueInput;
}
