import { Module } from '@sinbix-nest/common';
import { UtilsClientsModule } from '@sinbix/demo/apps/nest/server/utils';
import { TestController } from './test.controller';

@Module({
  imports: [UtilsClientsModule],
  controllers: [TestController],
})
export class UiBlogTestModule {}
