import { Module } from '@sinbix-nest/common';
import { ServicesGameModule } from '@sinbix/demo/apps/nest/server/services';
import { UtilsClientsModule } from '@sinbix/demo/apps/nest/server/utils';
import { TestController } from './test.controller';

@Module({
  imports: [ServicesGameModule, UtilsClientsModule],
  controllers: [TestController],
})
export class UiTestModule {}
