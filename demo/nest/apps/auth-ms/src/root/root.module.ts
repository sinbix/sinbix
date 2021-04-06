import { Module } from '@sinbix-nest/common';
import { UiAuthMsModule } from '@sinbix/demo/nest/ui/auth/ms';
import { UiUserMsModule } from '@sinbix/demo/nest/ui/user/ms';
import { DbAuthModule } from '@sinbix/demo/nest/db/auth';

@Module({
  imports: [UiAuthMsModule, UiUserMsModule, DbAuthModule],
})
export class RootModule {}
