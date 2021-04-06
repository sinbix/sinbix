import { Module } from '@sinbix-nest/common';
import { ServicesUserModule } from '@sinbix/demo/nest/services/user';
import { UserController } from './user.controller';

@Module({
  imports: [ServicesUserModule],
  controllers: [UserController],
})
export class UiUserModule {}
