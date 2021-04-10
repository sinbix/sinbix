import { Module } from '@sinbix-nest/common';
import { GraphqlModule } from '@sinbix-nest/common';

import {
  UiApiPostModule,
  UiApiAuthModule,
  UiApiUserModule,
  UiApiGameModule,
} from '@sinbix/demo/nest/ui/api';

@Module({
  imports: [
    GraphqlModule.forRoot(UiApiPostModule, UiApiAuthModule, UiApiUserModule),
    UiApiGameModule,
  ],
})
export class RootModule {}
