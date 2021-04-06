import { Module } from '@sinbix-nest/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '@sinbix/demo/nest/db/blog';

import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
  exports: [PostService],
})
export class ServicesPostModule {}
