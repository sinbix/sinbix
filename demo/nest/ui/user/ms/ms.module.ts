import { Module } from '@sinbix-nest/common';
import { ServicesUserModule } from '@sinbix/demo/nest/services/user';
import { MsController } from './ms.controller';

@Module({
  imports: [ServicesUserModule],
  controllers: [MsController],
})
export class UiUserMsModule {}
