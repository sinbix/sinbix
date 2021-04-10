import { Module } from '@sinbix-nest/common';
import { UtilsClientsAuthModule } from '@sinbix/demo/nest/utils/clients';
import { UserResolver } from './user.resolver';

@Module({
  imports: [UtilsClientsAuthModule],
  providers: [UserResolver],
})
export class UiApiUserModule {}
