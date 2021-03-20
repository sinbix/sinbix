import { Module } from '@nestjs/common';
import { GraphqlModule } from '@sinbix-nest/common';
import {
  UiBlogModule,
  UiAuthModule,
  UiUserModule,
  UiGameModule,
} from '@sinbix/demo/apps/nest/server/ui';

@Module({
  imports: [GraphqlModule.forRoot(UiBlogModule, UiAuthModule, UiUserModule), UiGameModule],
})
export class RootModule {}
