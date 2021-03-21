import { Module } from '@sinbix-nest/common';
import {
  UiPostModule,
  UiTestModule,
} from '@sinbix/demo/apps/nest/server-blog-ms/ui';
import { DbBlogModule } from '@sinbix/demo/apps/nest/server-blog-ms/db';

@Module({
  imports: [DbBlogModule, UiPostModule, UiTestModule],
})
export class RootModule {}
