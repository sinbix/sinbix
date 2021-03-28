import { Module } from '@sinbix-nest/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserProfile } from '@sinbix/demo/apps/nest/server-auth-ms/db';
import { PassportModule } from '@nestjs/passport';

import { ServicesUserModule } from '../user';
import { AuthService } from './auth.service';
import { AuthJwtModule } from './jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    ServicesUserModule,
    PassportModule,
    AuthJwtModule,
  ],
  providers: [AuthService],
  exports: [AuthService, PassportModule],
})
export class ServicesAuthModule {}
