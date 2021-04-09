import { Module } from '@sinbix-nest/common';
import { UtilsClientsAuthModule, UtilsClientsBlogModule } from '@sinbix/demo/nest/utils/clients';
import { GqlResolver } from './gql.resolver';

@Module({
  imports: [UtilsClientsBlogModule, UtilsClientsAuthModule],
  providers: [GqlResolver],
})
export class UiPostGqlModule {}
