import { Inject } from '@sinbix-nest/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ICreatePostGateway,
  IDeletePostGateway,
  IPost,
  IPostsGateway,
  IUpdatePostGateway,
} from '@sinbix/demo/apps/shared/utils';
import { BLOG_CLIENT } from '@sinbix/demo/apps/nest/server/utils';
import { MsClient } from '@sinbix-nest/microservices';

import {
  Post,
  PostCreateArgs,
  PostDeleteArgs,
  PostUpdateArgs,
} from './post.model';

@Resolver()
export class PostResolver
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway {
  constructor(@Inject(BLOG_CLIENT) private readonly blogClient: MsClient) {}

  @Query((returns) => [Post])
  posts(): Promise<IPost[]> {
    return this.blogClient.asyncSend('posts');
  }

  @Mutation((returns) => Post)
  createPost(@Args() args: PostCreateArgs): Promise<IPost> {
    return this.blogClient.asyncSend('createPost', args);
  }

  @Mutation((returns) => Post)
  updatePost(@Args() args: PostUpdateArgs): Promise<IPost> {
    return this.blogClient.asyncSend('updatePost', args);
  }

  @Mutation((returns) => Post)
  deletePost(@Args() args: PostDeleteArgs): Promise<IPost> {
    return this.blogClient.asyncSend('deletePost', args);
  }
}
