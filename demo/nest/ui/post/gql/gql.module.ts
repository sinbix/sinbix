import { Module } from '@sinbix-nest/common';
import { UtilsClientsModule } from '@sinbix/demo/nest/utils/clients';
import { GqlResolver } from './gql.resolver';

@Module({
  imports: [UtilsClientsModule],
  providers: [GqlResolver],
})
export class UiPostGqlModule {}
