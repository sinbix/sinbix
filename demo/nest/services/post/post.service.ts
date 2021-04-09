import { Inject, Injectable } from '@sinbix-nest/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '@sinbix/demo/nest/db/blog';

import {
  ICreatePostGateway,
  IDeletePostGateway,
  IPost,
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

@Injectable()
export class PostService
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway {
  constructor(
    @Inject(AUTH_CLIENT) private readonly authClient: MsClient,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  posts(): Observable<IPost[]> {
    return from(this.postRepository.find());
  }

  createPost(args: IPostCreateArgs): Observable<IPost> {
    return from(
      this.postRepository.save(
        this.postRepository.create({
          ...args.data,
          authorId: args.auth.user.id,
        })
      )
    );
  }

  updatePost(args: IPostUpdateArgs): Observable<IPost> {
    return from(
      this.postRepository
        .findOneOrFail(args.where.id, {
          where: { authorId: args.auth.user.id },
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
          where: { authorId: args.auth.user.id },
        })
        .then(async (post) => {
          await this.postRepository.delete(post.id);
          return post;
        })
    );
  }
}
