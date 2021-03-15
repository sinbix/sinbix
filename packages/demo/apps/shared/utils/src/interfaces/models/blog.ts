import { ID } from '@datorama/akita';

export interface IPost {
  id: string;
  authorId: number;
  title: string;
  content: string;
  comments: IPostComment[];
}

export interface IPostComment {
  authorId: number;
  content: string;
}
