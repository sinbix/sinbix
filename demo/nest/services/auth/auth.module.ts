import { Module } from '@sinbix-nest/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserProfile } from '@sinbix/demo/nest/db/auth';
import { PassportModule } from '@nestjs/passport';

import { ServicesUserModule } from '@sinbix/demo/nest/services/user';
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
