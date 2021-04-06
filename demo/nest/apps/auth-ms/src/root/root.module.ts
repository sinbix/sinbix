import { Module } from '@sinbix-nest/common';
import { UiAuthModule } from '@sinbix/demo/nest/ui/auth';
import { UiUserModule } from '@sinbix/demo/nest/ui/user';
import { DbAuthModule } from '@sinbix/demo/nest/db/auth';

@Module({
  imports: [UiAuthModule, UiUserModule, DbAuthModule],
})
export class RootModule {}
