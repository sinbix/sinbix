import { Module } from '@sinbix-nest/common';
import { ServicesUserModule } from '@sinbix/demo/apps/nest/server-auth-ms/services';
import { UserController } from './user.controller';

@Module({
  imports: [ServicesUserModule],
  controllers: [UserController],
})
export class UiUserModule {}
