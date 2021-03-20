import { Controller } from '@sinbix-nest/common';
import { MessagePattern } from '@sinbix-nest/microservices';
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
import { PostService } from '@sinbix/demo/apps/nest/server-blog-ms/services';

@Controller('post')
export class PostController
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway {
  constructor(private blogService: PostService) {}

  @MessagePattern('posts')
  async posts(): Promise<IPost[]> {
    return this.blogService.posts();
  }
  @MessagePattern('createPost')
  createPost(args: IPostCreateArgs): Promise<IPost> {
    return this.blogService.createPost(args);
  }
  @MessagePattern('updatePost')
  updatePost(args: IPostUpdateArgs): Promise<IPost> {
    return this.blogService.updatePost(args);
  }
  @MessagePattern('deletePost')
  deletePost(args: IPostDeleteArgs): Promise<IPost> {
    return this.blogService.deletePost(args);
  }
}
