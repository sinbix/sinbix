import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { MAX_TITLE } from '@sinbix/demo/shared/utils/post';
import type { IPost } from '@sinbix/demo/shared/utils/post';

@Entity()
export class Post implements IPost {
  @ObjectIdColumn({ name: '_id' })
  id: string;

  @Column()
  authorId: number;

  @Column({ type: 'varchar', length: MAX_TITLE })
  title: string;

  @Column()
  content: string;
}
