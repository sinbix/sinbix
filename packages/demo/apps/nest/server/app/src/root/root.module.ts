import { Module } from '@sinbix-nest/common';
import { GraphqlModule } from '@sinbix-nest/common';
import {
  UiBlogPostModule,
  UiAuthModule,
  UiAuthUserModule,
  UiGameModule,
  UiBlogTestModule,
} from '@sinbix/demo/apps/nest/server/ui';

@Module({
  imports: [
    GraphqlModule.forRoot(UiBlogPostModule, UiAuthModule, UiAuthUserModule),
    UiGameModule,
    UiBlogTestModule,
  ],
})
export class RootModule {}
