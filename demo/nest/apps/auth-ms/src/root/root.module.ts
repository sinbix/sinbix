import { Module } from '@sinbix-nest/common';
import {
  UiAuthModule,
  UiUserModule,
} from '@sinbix/demo/nest/ui';
import { DbAuthModule } from '@sinbix/demo/nest/db';

@Module({
  imports: [UiAuthModule, UiUserModule, DbAuthModule],
})
export class RootModule {}
