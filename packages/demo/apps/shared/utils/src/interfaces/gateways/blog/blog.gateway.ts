import { IPost } from '../../models';

import {
  IPostCreateInput,
  IPostUpdateArgs,
  IPostWhereUniqueInput,
} from './blog.args';

export interface IBlogGateway {
  getPosts(): Promise<IPost[]>;

  createPost(data: IPostCreateInput): Promise<IPost>;

  updatePost(args: IPostUpdateArgs): Promise<IPost>;

  deletePost(where: IPostWhereUniqueInput): Promise<IPost>;
}
