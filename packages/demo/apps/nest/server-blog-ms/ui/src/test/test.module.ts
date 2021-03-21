import { Module } from '@sinbix-nest/common';
import { ServicesGameModule } from '@sinbix/demo/apps/nest/server/services';
import { TestController } from './test.controller';

@Module({
  imports: [ServicesGameModule],
  controllers: [TestController],
})
export class UiTestModule {}
