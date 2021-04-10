import { Module } from '@sinbix-nest/common';
import { UtilsClientsBlogModule } from '@sinbix/demo/nest/utils/clients';
import { PostResolver } from './post.resolver';

@Module({
  imports: [UtilsClientsBlogModule],
  providers: [PostResolver],
})
export class UiApiPostModule {}
