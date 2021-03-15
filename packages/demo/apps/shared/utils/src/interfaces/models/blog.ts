import { ID } from '@datorama/akita';

export interface IPost {
  id: ID;
  authorId: ID;
  title: string;
  content: string;
  comments: IComment[];
}

export interface IComment {
  id: ID;
  authorId: ID;
  content: string;
}
