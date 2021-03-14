import { IComment, IPost } from '../../models';

import {
  IPostCommentCreateArgs,
  IPostCreateInput,
  IPostUpdateArgs,
  IPostWhereUniqueInput,
} from './blog.args';

export interface IBlogGateway {
  findAllPosts(): Promise<IPost[]>;

  createPost(data: IPostCreateInput): Promise<IPost>;

  updatePost(args: IPostUpdateArgs): Promise<IPost>;

  deletePost(where: IPostWhereUniqueInput): Promise<IPost>;

  addCommentPost(args: IPostCommentCreateArgs): Promise<IComment>;
}
