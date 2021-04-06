import { Module } from '@sinbix-nest/common';
import { PostController } from './ms.controller';
import { ServicesPostModule } from '@sinbix/demo/apps/nest/server-blog-ms/services';

@Module({
  imports: [ServicesPostModule],
  controllers: [PostController],
})
export class UiPostMsModule {}
