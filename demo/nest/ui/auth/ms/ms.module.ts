import { Module } from '@sinbix-nest/common';
import { ServicesAuthModule } from '@sinbix/demo/nest/services/auth';
import { MsController } from './ms.controller';

@Module({
  imports: [ServicesAuthModule],
  controllers: [MsController],
})
export class UiAuthMsModule {}
