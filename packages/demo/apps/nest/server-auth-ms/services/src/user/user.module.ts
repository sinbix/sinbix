import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserProfile } from '@sinbix/demo/apps/nest/server-auth-ms/db';

import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile])],
  providers: [UserService],
  exports: [UserService],
})
export class ServicesUserModule {}
