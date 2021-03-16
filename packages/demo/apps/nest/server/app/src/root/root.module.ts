import { Module } from '@nestjs/common';
import { GraphqlModule } from '@sinbix-nest/utils';
import { BlogModule, AuthModule } from '@sinbix/demo/apps/nest/server/ui';

@Module({
  imports: [GraphqlModule.forRoot(BlogModule, AuthModule)],
})
export class RootModule {}
