import { Module } from '@nestjs/common';
import { BlogModule } from '@sinbix/demo/apps/nest/server-blog-ms/ui';
import { DbBlogModule } from '@sinbix/demo/apps/nest/server-blog-ms/db';

@Module({
  imports: [DbBlogModule, BlogModule],
})
export class RootModule {}
