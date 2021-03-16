import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getMongoManager } from 'typeorm';

import { Post } from '@sinbix/demo/apps/nest/server-blog-ms/db';

import {
  IBlogGateway,
  IPost,
  IPostCreateInput,
  IPostUpdateArgs,
  IPostWhereUniqueInput,
} from '@sinbix/demo/apps/shared/utils';

@Injectable()
export class BlogService implements IBlogGateway {
  mongoManager = getMongoManager();

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ) {}

  getPosts(): Promise<IPost[]> {
    return this.postRepository.find();
  }

  createPost(data: IPostCreateInput): Promise<IPost> {
    return this.postRepository.save(this.postRepository.create(data));
  }

  async updatePost(args: IPostUpdateArgs): Promise<IPost> {
    const { id: postId } = args.where;

    await this.postRepository.update(postId, args.data);

    return this.postRepository.findOne(postId);
  }

  async deletePost(where: IPostWhereUniqueInput): Promise<IPost> {
    const id = where.id;

    const post = await this.postRepository.findOneOrFail(id);

    await this.postRepository.delete(id);
    return post;
  }
}
