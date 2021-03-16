import { Module } from '@nestjs/common';
import { UiAuthModule } from '@sinbix/demo/apps/nest/server-auth-ms/ui';
import { DbAuthModule } from '@sinbix/demo/apps/nest/server-auth-ms/db';

@Module({
  imports: [UiAuthModule, DbAuthModule],
})
export class RootModule {}
