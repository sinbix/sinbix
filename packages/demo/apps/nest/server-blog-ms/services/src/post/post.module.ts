import { Module } from '@sinbix-nest/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '@sinbix/demo/apps/nest/server-blog-ms/db';

import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
  exports: [PostService],
})
export class ServicesPostModule {}
