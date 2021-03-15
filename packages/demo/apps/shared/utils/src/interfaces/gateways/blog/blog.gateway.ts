import { IPostComment, IPost } from '../../models';

import {
  IPostCommentCreateArgs,
  IPostCreateInput,
  IPostUpdateArgs,
  IPostWhereUniqueInput,
} from './blog.args';

export interface IBlogGateway {
  getPosts(): Promise<IPost[]>;

  createPost(data: IPostCreateInput): Promise<IPost>;

  updatePost(args: IPostUpdateArgs): Promise<IPost>;

  deletePost(where: IPostWhereUniqueInput): Promise<IPost>;

  addCommentPost(args: IPostCommentCreateArgs): Promise<IPostComment>;
}
