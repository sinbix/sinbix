import { Inject, Injectable } from '@sinbix-nest/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { Post } from '@sinbix/demo/nest/db/blog';

import {
  ICreatePostGateway,
  IDeleteAuthorPostsGateway,
  IDeletePostGateway,
  IPost,
  IPostAuthorDeleteArgs,
  IPostCreateArgs,
  IPostDeleteArgs,
  IPostsGateway,
  IPostUpdateArgs,
  IUpdatePostGateway,
} from '@sinbix/demo/shared/utils/post';

import * as _ from 'lodash';
import { from, Observable } from 'rxjs';
import { AUTH_CLIENT } from '@sinbix/demo/nest/utils/clients';
import { MsClient } from '@sinbix-nest/microservices';
import { IBatchPayload } from '@sinbix/demo/shared/utils/shared';

@Injectable()
export class PostService
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway,
    IDeleteAuthorPostsGateway {
  constructor(
    @Inject(AUTH_CLIENT) private readonly authClient: MsClient,
    @InjectRepository(Post)
    private readonly postRepository: MongoRepository<Post>
  ) {}

  posts(): Observable<IPost[]> {
    return from(this.postRepository.find());
  }

  createPost(args: IPostCreateArgs): Observable<IPost> {
    return from(
      this.postRepository.save(
        this.postRepository.create({
          ...args.data,
          authorId: args._auth.user.id,
        })
      )
    );
  }

  updatePost(args: IPostUpdateArgs): Observable<IPost> {
    return from(
      this.postRepository
        .findOneOrFail(args.where.id, {
          where: { authorId: args._auth.user.id },
        })
        .then((post) => {
          return this.postRepository.save(_.assign(post, args.data));
        })
    );
  }

  deletePost(args: IPostDeleteArgs): Observable<IPost> {
    return from(
      this.postRepository
        .findOneOrFail(args.where.id, {
          where: { authorId: args._auth.user.id },
        })
        .then(async (post) => {
          await this.postRepository.delete(post.id);
          return post;
        })
    );
  }

  deleteAuthorPosts(args: IPostAuthorDeleteArgs): Observable<IBatchPayload> {
    return from(
      this.postRepository
        .deleteMany({ authorId: args.authorId })
        .then((value) => {
          return {
            count: value?.deletedCount,
          };
        })
    );
  }
}
