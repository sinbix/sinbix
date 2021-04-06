import { Module } from '@sinbix-nest/common';
import { PostController } from './ms.controller';
import { ServicesPostModule } from '@sinbix/demo/nest/services/post';

@Module({
  imports: [ServicesPostModule],
  controllers: [PostController],
})
export class UiPostMsModule {}
