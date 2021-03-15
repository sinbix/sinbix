import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '@sinbix/demo/apps/nest/server-blog-ms/db';

import { BlogService } from './blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [BlogService],
  exports: [BlogService],
})
export class ServicesBlogModule {}
