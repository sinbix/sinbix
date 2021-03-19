import { Module } from '@nestjs/common';
import { UtilsClientsModule } from '@sinbix/demo/apps/nest/server/utils';
import { BlogResolver } from './blog.resolver';

@Module({
  imports: [UtilsClientsModule],
  providers: [BlogResolver],
})
export class UiBlogModule {}
