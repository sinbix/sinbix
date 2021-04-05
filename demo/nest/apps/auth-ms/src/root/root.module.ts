import { Module } from '@sinbix-nest/common';
import {
  UiAuthModule,
  UiUserModule,
} from '@sinbix/demo/apps/nest/server-auth-ms/ui';
import { DbAuthModule } from '@sinbix/demo/apps/nest/server-auth-ms/db';

@Module({
  imports: [UiAuthModule, UiUserModule, DbAuthModule],
})
export class RootModule {}
