import { Injectable } from '@sinbix-nest/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '@sinbix/demo/apps/nest/server-blog-ms/db';

import {
  ICreatePostGateway,
  IDeletePostGateway,
  IPost,
  IPostCreateArgs,
  IPostDeleteArgs,
  IPostsGateway,
  IPostUpdateArgs,
  IUpdatePostGateway,
} from '@sinbix/demo/apps/shared/utils';

import * as _ from 'lodash';
import { from, Observable } from 'rxjs';

@Injectable()
export class PostService
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  posts(): Observable<IPost[]> {
    return from(this.postRepository.find());
  }

  createPost(args: IPostCreateArgs): Observable<IPost> {
    return from(
      this.postRepository.save(this.postRepository.create(args.data))
    );
  }

  updatePost(args: IPostUpdateArgs): Observable<IPost> {
    return from(
      this.postRepository.findOneOrFail(args.where.id).then((post) => {
        return this.postRepository.save(_.assign(post, args.data));
      })
    );
  }

  deletePost(args: IPostDeleteArgs): Observable<IPost> {
    return from(
      this.postRepository.findOneOrFail(args.where.id).then(async (post) => {
        await this.postRepository.delete(post.id);
        return post;
      })
    );
  }
}
