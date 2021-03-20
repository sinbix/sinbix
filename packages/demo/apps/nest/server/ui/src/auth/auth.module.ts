import { Module } from '@sinbix-nest/common';
import { UtilsClientsModule } from '@sinbix/demo/apps/nest/server/utils';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UtilsClientsModule],
  providers: [AuthResolver],
})
export class UiAuthModule {}
