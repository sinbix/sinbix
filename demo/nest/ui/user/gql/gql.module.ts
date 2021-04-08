import { Module } from '@sinbix-nest/common';
import { UtilsClientsAuthModule } from '@sinbix/demo/nest/utils/clients';
import { GqlResolver } from './gql.resolver';

@Module({
  imports: [UtilsClientsAuthModule],
  providers: [GqlResolver],
})
export class UiUserGqlModule {}
