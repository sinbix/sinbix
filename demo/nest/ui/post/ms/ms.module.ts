import { Module } from '@sinbix-nest/common';
import { ServicesPostModule } from '@sinbix/demo/nest/services/post';
import { UtilsClientsAuthModule } from '@sinbix/demo/nest/utils/clients';

import { PostController } from './ms.controller';

@Module({
  imports: [ServicesPostModule, UtilsClientsAuthModule],
  controllers: [PostController],
})
export class UiPostMsModule {}
