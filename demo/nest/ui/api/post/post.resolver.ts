import { Inject } from '@sinbix-nest/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ICreatePostGateway,
  IDeletePostGateway,
  IPost,
  IPostDeleteArgs,
  IPostsGateway,
  IPostUpdateArgs,
  IUpdatePostGateway,
} from '@sinbix/demo/shared/utils/post';
import { AuthJwtGql, BLOG_CLIENT } from '@sinbix/demo/nest/utils/clients';
import { MsClient } from '@sinbix-nest/microservices';
import { Observable } from 'rxjs';

import {
  Post,
  PostCreateArgs,
  PostDeleteArgs,
  PostUpdateArgs,
} from './post.schema';

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
  @AuthJwtGql()
  createPost(@Args() args: PostCreateArgs): Observable<IPost> {
    return this.blogClient.send('createPost', args);
  }

  @Mutation((returns) => Post)
  @AuthJwtGql()
  updatePost(@Args() args: PostUpdateArgs): Observable<IPost> {
    return this.blogClient.send<IPost, IPostUpdateArgs>('updatePost', args);
  }

  @Mutation((returns) => Post)
  @AuthJwtGql()
  deletePost(@Args() args: PostDeleteArgs): Observable<IPost> {
    return this.blogClient.send<IPost, IPostDeleteArgs>('deletePost', args);
  }
}
