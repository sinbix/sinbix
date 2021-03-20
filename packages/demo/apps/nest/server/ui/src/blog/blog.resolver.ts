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
import { ClientProxy } from '@sinbix-nest/microservices';
import { timeout } from 'rxjs/operators';

import {
  Post,
  PostCreateArgs,
  PostDeleteArgs,
  PostUpdateArgs,
} from './blog.model';

@Resolver((of) => String)
export class BlogResolver
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway {
  constructor(@Inject(BLOG_CLIENT) private readonly blogClient: ClientProxy) {}

  @Query((returns) => [Post])
  posts(): Promise<IPost[]> {
    return this.blogClient.send('posts', []).pipe(timeout(5000)).toPromise();
  }

  @Mutation((returns) => Post)
  createPost(@Args() args: PostCreateArgs): Promise<IPost> {
    return this.blogClient
      .send('createPost', args)
      .pipe(timeout(5000))
      .toPromise();
  }

  @Mutation((returns) => Post)
  updatePost(@Args() args: PostUpdateArgs): Promise<IPost> {
    return this.blogClient
      .send('updatePost', args)
      .pipe(timeout(5000))
      .toPromise();
  }

  @Mutation((returns) => Post)
  deletePost(@Args() args: PostDeleteArgs): Promise<IPost> {
    return this.blogClient
      .send('deletePost', args)
      .pipe(timeout(5000))
      .toPromise();
  }
}
