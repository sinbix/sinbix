import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserProfile } from '@sinbix/demo/apps/nest/server-auth-ms/db';

import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile])],
  providers: [AuthService],
  exports: [AuthService],
})
export class ServicesAuthModule {}
