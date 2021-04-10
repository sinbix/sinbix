import { Module } from '@sinbix-nest/common';
import { UtilsClientsAuthModule } from '@sinbix/demo/nest/utils/clients';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UtilsClientsAuthModule],
  providers: [AuthResolver],
})
export class UiApiAuthModule {}
