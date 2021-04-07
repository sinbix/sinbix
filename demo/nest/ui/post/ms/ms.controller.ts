import { Controller } from '@sinbix-nest/common';
import {
  MessagePattern,
  Payload,
  RcpCatcher,
} from '@sinbix-nest/microservices';
import type {
  ICreatePostGateway,
  IDeletePostGateway,
  IPost,
  IPostCreateArgs,
  IPostDeleteArgs,
  IPostsGateway,
  IPostUpdateArgs,
  IUpdatePostGateway,
} from '@sinbix/demo/shared/types/post';
import { PostService } from '@sinbix/demo/nest/services/post';
import { Observable } from 'rxjs';

@Controller('post')
export class PostController
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway {
  constructor(private postService: PostService) {}

  @RcpCatcher()
  @MessagePattern('posts')
  posts(): Observable<IPost[]> {
    return this.postService.posts();
  }

  @RcpCatcher()
  @MessagePattern('createPost')
  createPost(@Payload() args: IPostCreateArgs): Observable<IPost> {
    return this.postService.createPost(args);
  }

  @RcpCatcher()
  @MessagePattern('updatePost')
  updatePost(@Payload() args: IPostUpdateArgs): Observable<IPost> {
    return this.postService.updatePost(args);
  }

  @RcpCatcher()
  @MessagePattern('deletePost')
  deletePost(@Payload() args: IPostDeleteArgs): Observable<IPost> {
    return this.postService.deletePost(args);
  }
}
