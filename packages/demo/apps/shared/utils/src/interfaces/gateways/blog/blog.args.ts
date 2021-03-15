import { ID } from '@datorama/akita';

export interface IPostCreateInput {
  authorId: number;
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

export interface IPostUpdateArgs {
  data: IPostUpdateInput;

  where: IPostWhereUniqueInput;
}

export interface IPostCommentCreateInput {
  authorId: number;

  content: string;
}

export interface IPostCommentCreateArgs {
  data: IPostCommentCreateInput;

  where: IPostWhereUniqueInput;
}
