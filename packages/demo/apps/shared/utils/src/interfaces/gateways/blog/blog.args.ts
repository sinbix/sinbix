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
