import { Controller, UseGuards } from '@sinbix-nest/common';
import {
  MessagePattern,
  Payload,
  RcpCatcher,
  RpcValidator,
} from '@sinbix-nest/microservices';
import {
  CREATE_POST_VALIDATOR,
  DELETE_AUTHOR_POSTS_VALIDATOR,
  DELETE_POST_VALIDATOR,
  UPDATE_POST_VALIDATOR,
} from '@sinbix/demo/shared/utils/post';
import type {
  ICreatePostGateway,
  IDeletePostGateway,
  IPost,
  IPostCreateArgs,
  IPostDeleteArgs,
  IPostsGateway,
  IPostUpdateArgs,
  IUpdatePostGateway,
  IDeleteAuthorPostsGateway,
  IPostAuthorDeleteArgs,
} from '@sinbix/demo/shared/utils/post';
import { PostService } from '@sinbix/demo/nest/services/post';
import { Observable } from 'rxjs';
import { AdminMsGuard, AuthMsGuard } from '@sinbix/demo/nest/utils/clients';
import { IBatchPayload } from '@sinbix/demo/shared/utils/shared';

@Controller('post')
export class PostController
  implements
    IPostsGateway,
    ICreatePostGateway,
    IUpdatePostGateway,
    IDeletePostGateway,
    IDeleteAuthorPostsGateway {
  constructor(private postService: PostService) {}

  @RcpCatcher()
  @MessagePattern('posts')
  posts(): Observable<IPost[]> {
    return this.postService.posts();
  }

  @RcpCatcher()
  @UseGuards(AuthMsGuard)
  @RpcValidator(CREATE_POST_VALIDATOR)
  @MessagePattern('createPost')
  createPost(@Payload() args: IPostCreateArgs): Observable<IPost> {
    return this.postService.createPost(args);
  }

  @RcpCatcher()
  @UseGuards(AuthMsGuard)
  @RpcValidator(UPDATE_POST_VALIDATOR)
  @MessagePattern('updatePost')
  updatePost(@Payload() args: IPostUpdateArgs): Observable<IPost> {
    return this.postService.updatePost(args);
  }

  @RcpCatcher()
  @UseGuards(AuthMsGuard)
  @RpcValidator(DELETE_POST_VALIDATOR)
  @MessagePattern('deletePost')
  deletePost(@Payload() args: IPostDeleteArgs): Observable<IPost> {
    return this.postService.deletePost(args);
  }

  @RcpCatcher()
  @UseGuards(AdminMsGuard)
  @RpcValidator(DELETE_AUTHOR_POSTS_VALIDATOR)
  @MessagePattern('deleteAuthorPosts')
  deleteAuthorPosts(
    @Payload() args: IPostAuthorDeleteArgs
  ): Observable<IBatchPayload> {
    return this.postService.deleteAuthorPosts(args);
  }
}
