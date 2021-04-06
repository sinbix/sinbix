import { Module } from '@sinbix-nest/common';
import { TestController } from './test.controller';

@Module({
  controllers: [TestController],
})
export class UiTestModule {}
