import { Inject } from '@sinbix-nest/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ICreatePostGateway,
  IDeletePostGateway,
  IPost,
  IPostsGateway,
  IUpdatePostGateway,
} from '@sinbix/demo/shared/types';
import { BLOG_CLIENT } from '@sinbix/demo/apps/nest/server/utils';
import { MsClient } from '@sinbix-nest/microservices';

import {
  Post,
  PostCreateArgs,
  PostDeleteArgs,
  PostUpdateArgs,
} from './post.model';
import { Observable } from 'rxjs';

@Resolver()
export class PostResolver
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway {
  constructor(@Inject(BLOG_CLIENT) private readonly blogClient: MsClient) {}

  @Query((returns) => [Post])
  posts(): Observable<IPost[]> {
    return this.blogClient.send('posts');
  }

  @Mutation((returns) => Post)
  createPost(@Args() args: PostCreateArgs): Observable<IPost> {
    return this.blogClient.send('createPost', args);
  }

  @Mutation((returns) => Post)
  updatePost(@Args() args: PostUpdateArgs): Observable<IPost> {
    return this.blogClient.send('updatePost', args);
  }

  @Mutation((returns) => Post)
  deletePost(@Args() args: PostDeleteArgs): Observable<IPost> {
    return this.blogClient.send('deletePost', args);
  }
}
