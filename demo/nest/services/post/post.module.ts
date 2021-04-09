import { Module } from '@sinbix-nest/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from '@sinbix/demo/nest/db/blog';

import { UtilsClientsAuthModule } from '@sinbix/demo/nest/utils/clients';

import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UtilsClientsAuthModule],
  providers: [PostService],
  exports: [PostService],
})
export class ServicesPostModule {}
