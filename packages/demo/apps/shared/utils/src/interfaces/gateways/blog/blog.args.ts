import { ID } from '@datorama/akita';

export interface IPostCreateInput {
  authorId: ID;

  title: string;

  content: string;
}

export interface IPostWhereUniqueInput {
  id: ID;
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
  authorId: ID;

  content: string;
}

export interface IPostCommentCreateArgs {
  data: IPostCommentCreateInput;

  where: IPostWhereUniqueInput;
}
