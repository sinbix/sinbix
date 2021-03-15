import { Module } from '@nestjs/common';
import { BlogModule } from '@sinbix/demo/apps/nest/server-blog-ms/ui';
import { BlogDbModule } from '@sinbix/demo/apps/nest/server-blog-ms/db';

@Module({
  imports: [BlogDbModule, BlogModule],
})
export class RootModule {}
