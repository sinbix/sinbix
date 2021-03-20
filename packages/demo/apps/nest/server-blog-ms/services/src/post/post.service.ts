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

  posts(): Promise<IPost[]> {
    return this.postRepository.find();
  }

  createPost(args: IPostCreateArgs): Promise<IPost> {
    return this.postRepository.save(this.postRepository.create(args.data));
  }

  updatePost(args: IPostUpdateArgs): Promise<IPost> {
    return this.postRepository.findOneOrFail(args.where.id).then((post) => {
      return this.postRepository.save(_.assign(post, args.data));
    });
  }

  async deletePost(args: IPostDeleteArgs): Promise<IPost> {
    return this.postRepository
      .findOneOrFail(args.where.id)
      .then(async (post) => {
        await this.postRepository.delete(post.id);
        return post;
      });
  }
}
