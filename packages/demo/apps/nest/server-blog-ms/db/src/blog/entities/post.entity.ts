import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { IPost } from '@sinbix/demo/apps/shared/utils';

@Entity()
export class Post implements IPost {
  @ObjectIdColumn({ name: '_id' })
  id: string;

  @Column()
  authorId: number;

  @Column()
  title: string;

  @Column()
  content: string;
}
