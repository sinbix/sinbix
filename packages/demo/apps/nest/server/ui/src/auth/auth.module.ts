import { Module } from '@nestjs/common';
import { UtilsClientsModule } from '@sinbix/demo/apps/nest/server/utils';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UtilsClientsModule],
  providers: [AuthResolver],
})
export class UiAuthModule {}
