import { Module } from '@sinbix-nest/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserProfile } from '@sinbix/demo/nest/db/auth';

import { ServicesUserModule } from '@sinbix/demo/nest/services/user';
import { AuthService } from './auth.service';
import { AuthJwtModule } from './jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    ServicesUserModule,
    AuthJwtModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class ServicesAuthModule {}
