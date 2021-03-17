import { IPostCreateArgs, IPostDeleteArgs, IPostUpdateArgs } from './args';
import { IPost } from './models';

export interface IPostsGateway {
  posts(): Promise<IPost[]>;
}

export interface ICreatePostGateway {
  createPost(args: IPostCreateArgs): Promise<IPost>;
}

export interface IUpdatePostGateway {
  updatePost(args: IPostUpdateArgs): Promise<IPost>;
}

export interface IDeletePostGateway {
  deletePost(where: IPostDeleteArgs): Promise<IPost>;
}
