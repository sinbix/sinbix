import { Query, Resolver } from '@nestjs/graphql';
import {
  IBlogGateway,
  IComment,
  IPost,
  IPostCommentCreateArgs,
  IPostCreateInput,
  IPostUpdateArgs,
  IPostWhereUniqueInput,
} from '@sinbix/demo/apps/shared/utils';

import { Post } from './blog.model';

@Resolver((of) => String)
export class BlogResolver implements IBlogGateway {
  @Query((returns) => [Post])
  async getPosts(): Promise<IPost[]> {
    return [];
  }

  createPost(data: IPostCreateInput): Promise<IPost> {
    throw new Error('Method not implemented.');
  }
  updatePost(args: IPostUpdateArgs): Promise<IPost> {
    throw new Error('Method not implemented.');
  }
  deletePost(where: IPostWhereUniqueInput): Promise<IPost> {
    throw new Error('Method not implemented.');
  }
  addCommentPost(args: IPostCommentCreateArgs): Promise<IComment> {
    throw new Error('Method not implemented.');
  }
}
