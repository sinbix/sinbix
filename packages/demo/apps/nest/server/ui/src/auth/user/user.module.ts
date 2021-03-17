import { Module } from '@nestjs/common';
import { UtilsClientsModule } from '@sinbix/demo/apps/nest/server/utils';
import { UserResolver } from './user.resolver';

@Module({
  imports: [UtilsClientsModule],
  providers: [UserResolver],
})
export class UiUserModule {}
