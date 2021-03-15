import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getMongoManager } from 'typeorm';

import { Post, PostComment } from '@sinbix/demo/apps/nest/server-blog-ms/db';
import {
  IBlogGateway,
  IPost,
  IPostComment,
  IPostCommentCreateArgs,
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
    const id = args.where.id;

    await this.postRepository.update(id, args.data);
    return this.postRepository.findOne(id);
  }

  async deletePost(where: IPostWhereUniqueInput): Promise<IPost> {
    const id = where.id;

    const post = await this.postRepository.findOneOrFail(id);

    await this.postRepository.delete(id);
    return post;
  }

  async addCommentPost(args: IPostCommentCreateArgs): Promise<IPostComment> {
    const { id: postId } = args.where;

    const { authorId, content } = args.data;

    const post = await this.postRepository.findOneOrFail(postId);

    const comment = new PostComment(authorId, content);

    if (!post.comments?.length) {
      post.comments = [];
    }

    post.comments.push(comment);

    await this.mongoManager.save(post);

    return args.data;
  }
}
