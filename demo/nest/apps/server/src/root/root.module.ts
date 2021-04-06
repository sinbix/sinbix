import { Module } from '@sinbix-nest/common';
import { GraphqlModule } from '@sinbix-nest/common';

import { UiPostGqlModule } from '@sinbix/demo/nest/ui/post/gql';
import { UiAuthGqlModule } from '@sinbix/demo/nest/ui/auth/gql';
import { UiUserGqlModule } from '@sinbix/demo/nest/ui/user/gql';

import { UiGameModule } from '@sinbix/demo/nest/ui/game';
import { UiTestModule } from '@sinbix/demo/nest/ui/test';

@Module({
  imports: [
    GraphqlModule.forRoot(UiPostGqlModule, UiAuthGqlModule, UiUserGqlModule),
    UiGameModule,
    UiTestModule,
  ],
})
export class RootModule {}
