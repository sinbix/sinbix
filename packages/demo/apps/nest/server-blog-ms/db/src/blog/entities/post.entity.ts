import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { IPostComment, IPost } from '@sinbix/demo/apps/shared/utils';

@Entity()
export class Post implements IPost {
  @ObjectIdColumn()
  id: string;

  @Column()
  authorId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  comments: PostComment[];
}

@Entity()
export class PostComment implements IPostComment {
  @Column()
  authorId: number;

  @Column()
  content: string;

  constructor(authorId: number, content: string) {
    this.authorId = authorId;
    this.content = content;
  }
}
