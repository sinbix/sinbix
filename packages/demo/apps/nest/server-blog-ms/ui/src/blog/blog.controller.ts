import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  IBlogGateway,
  IPostComment,
  IPost,
  IPostCommentCreateArgs,
  IPostCreateInput,
  IPostUpdateArgs,
  IPostWhereUniqueInput,
} from '@sinbix/demo/apps/shared/utils';
import { BlogService } from '@sinbix/demo/apps/nest/server-blog-ms/services';

@Controller('blog')
export class BlogController implements IBlogGateway {
  constructor(private blogService: BlogService) {}

  @MessagePattern('getPosts')
  async getPosts(): Promise<IPost[]> {
    return this.blogService.getPosts();
  }
  @MessagePattern('createPost')
  createPost(data: IPostCreateInput): Promise<IPost> {
    return this.blogService.createPost(data);
  }
  @MessagePattern('updatePost')
  updatePost(args: IPostUpdateArgs): Promise<IPost> {
    return this.blogService.updatePost(args);
  }
  @MessagePattern('deletePost')
  deletePost(where: IPostWhereUniqueInput): Promise<IPost> {
    return this.blogService.deletePost(where);
  }
  @MessagePattern('addCommentPost')
  addCommentPost(args: IPostCommentCreateArgs): Promise<IPostComment> {
    return this.blogService.addCommentPost(args);
  }
}
