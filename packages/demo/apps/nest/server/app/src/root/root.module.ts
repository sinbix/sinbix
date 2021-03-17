import { Module } from '@nestjs/common';
import { GraphqlModule } from '@sinbix-nest/utils';
import {
  BlogModule,
  AuthModule,
  UiUserModule,
} from '@sinbix/demo/apps/nest/server/ui';

@Module({
  imports: [GraphqlModule.forRoot(BlogModule, AuthModule, UiUserModule)],
})
export class RootModule {}
