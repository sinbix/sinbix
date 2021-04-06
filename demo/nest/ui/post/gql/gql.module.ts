import { Module } from '@sinbix-nest/common';
import { UtilsClientsModule } from '@sinbix/demo/apps/nest/server/utils';
import { GqlResolver } from './gql.resolver';

@Module({
  imports: [UtilsClientsModule],
  providers: [GqlResolver],
})
export class UiPostGqlModule {}
