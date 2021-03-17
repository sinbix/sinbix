import { Injectable } from '@nestjs/common';
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

  async updatePost(args: IPostUpdateArgs): Promise<IPost> {
    const { id: postId } = args.where;

    await this.postRepository.update(postId, args.data);

    return this.postRepository.findOne(postId);
  }

  async deletePost(args: IPostDeleteArgs): Promise<IPost> {
    const id = args.where.id;

    const post = await this.postRepository.findOneOrFail(id);

    await this.postRepository.delete(id);
    return post;
  }
}
