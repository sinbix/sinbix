import { Module } from '@sinbix-nest/common';
import { ServicesAuthModule } from '@sinbix/demo/apps/nest/server-auth-ms/services';
import { AuthController } from './auth.controller';

@Module({
  imports: [ServicesAuthModule],
  controllers: [AuthController],
})
export class UiAuthModule {}
