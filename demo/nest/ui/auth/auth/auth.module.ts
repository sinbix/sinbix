import { Module } from '@sinbix-nest/common';
import { ServicesAuthModule } from '@sinbix/demo/nest/services/auth';
import { AuthController } from './auth.controller';

@Module({
  imports: [ServicesAuthModule],
  controllers: [AuthController],
})
export class UiAuthAuthModule {}
