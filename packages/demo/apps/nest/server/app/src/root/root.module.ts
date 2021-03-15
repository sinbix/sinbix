import { Module } from '@nestjs/common';
import { GraphqlModule } from '@sinbix-nest/utils';
import { BlogModule } from '@sinbix/demo/apps/nest/server/ui';

@Module({
  imports: [GraphqlModule.forRoot(BlogModule)],
})
export class RootModule {}
