import { Module } from '@sinbix-nest/common';
import { UtilsClientsModule } from '@sinbix/demo/apps/nest/server/utils';
import { PostResolver } from './post.resolver';

@Module({
  imports: [UtilsClientsModule],
  providers: [PostResolver],
})
export class UiBlogPostModule {}
