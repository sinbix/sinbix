import { Controller } from '@sinbix-nest/common';
import { MessagePattern, Payload } from '@sinbix-nest/microservices';
import type {
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
import { Observable } from 'rxjs';

@Controller('post')
export class PostController
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway {
  constructor(private postService: PostService) {}

  @MessagePattern('posts')
  posts(): Observable<IPost[]> {
    return this.postService.posts();
  }
  @MessagePattern('createPost')
  createPost(@Payload() args: IPostCreateArgs): Observable<IPost> {
    return this.postService.createPost(args);
  }
  @MessagePattern('updatePost')
  updatePost(@Payload() args: IPostUpdateArgs): Observable<IPost> {
    return this.postService.updatePost(args);
  }
  @MessagePattern('deletePost')
  deletePost(@Payload() args: IPostDeleteArgs): Observable<IPost> {
    return this.postService.deletePost(args);
  }
}
