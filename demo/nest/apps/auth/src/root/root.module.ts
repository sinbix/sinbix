import { Module } from '@sinbix-nest/common';
import { UiAuthAuthModule, UiAuthUserModule } from '@sinbix/demo/nest/ui/auth';
import { DbAuthModule } from '@sinbix/demo/nest/db/auth';

@Module({
  imports: [UiAuthAuthModule, UiAuthUserModule, DbAuthModule],
})
export class RootModule {}
