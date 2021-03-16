import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IBlogGateway, IPost } from '@sinbix/demo/apps/shared/utils';
import { BLOG_CLIENT } from '@sinbix/demo/apps/nest/server/utils';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

import {
  Post,
  PostCreateInput,
  PostUpdateArgs,
  PostWhereUniqueInput,
} from './blog.model';

@Resolver((of) => String)
export class BlogResolver implements IBlogGateway {
  constructor(@Inject(BLOG_CLIENT) private readonly blogClient: ClientProxy) {}

  @Query((returns) => [Post])
  getPosts(): Promise<IPost[]> {
    return this.blogClient.send('getPosts', []).pipe(timeout(5000)).toPromise();
  }

  @Mutation((returns) => Post)
  createPost(@Args('data') data: PostCreateInput): Promise<IPost> {
    return this.blogClient
      .send('createPost', data)
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
  deletePost(@Args('where') where: PostWhereUniqueInput): Promise<IPost> {
    return this.blogClient
      .send('deletePost', where)
      .pipe(timeout(5000))
      .toPromise();
  }
}
