import { Module } from '@sinbix-nest/common';

import { UiPostMsModule } from '@sinbix/demo/nest/ui/post/ms';
import { UiTestModule } from '@sinbix/demo/nest/ui/test';
import { DbBlogModule } from '@sinbix/demo/nest/db/blog';

@Module({
  imports: [DbBlogModule, UiPostMsModule, UiTestModule],
})
export class RootModule {}
