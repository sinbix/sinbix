import { Module } from '@sinbix-nest/common';

import { UiBlogPostModule } from '@sinbix/demo/nest/ui/blog';
import { DbBlogModule } from '@sinbix/demo/nest/db/blog';

@Module({
  imports: [DbBlogModule, UiBlogPostModule],
})
export class RootModule {}
