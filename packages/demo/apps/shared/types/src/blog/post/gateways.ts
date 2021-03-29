import { Observable } from 'rxjs';
import { IPostCreateArgs, IPostDeleteArgs, IPostUpdateArgs } from './args';
import { IPost } from './models';

export interface IPostsGateway {
  posts(): Observable<IPost[]>;
}

export interface ICreatePostGateway {
  createPost(args: IPostCreateArgs): Observable<IPost>;
}

export interface IUpdatePostGateway {
  updatePost(args: IPostUpdateArgs): Observable<IPost>;
}

export interface IDeletePostGateway {
  deletePost(args: IPostDeleteArgs): Observable<IPost>;
}
