import { Module } from '@nestjs/common';
import { UiAuthModule } from '@sinbix/demo/apps/nest/server-auth-ms/ui';

@Module({
  imports: [UiAuthModule],
})
export class RootModule {}
