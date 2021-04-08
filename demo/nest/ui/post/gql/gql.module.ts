import { Module } from '@sinbix-nest/common';
import { UtilsClientsBlogModule } from '@sinbix/demo/nest/utils/clients';
import { GqlResolver } from './gql.resolver';

@Module({
  imports: [UtilsClientsBlogModule],
  providers: [GqlResolver],
})
export class UiPostGqlModule {}
