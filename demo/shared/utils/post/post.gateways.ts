import { Observable } from 'rxjs';
import { IPostCreateArgs, IPostDeleteArgs, IPostUpdateArgs } from './post.args';
import { IPost } from './post.models';

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
