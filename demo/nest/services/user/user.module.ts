import { Module } from '@sinbix-nest/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserProfile } from '@sinbix/demo/nest/db/auth';
import { UtilsClientsBlogModule } from '@sinbix/demo/nest/utils/clients';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    UtilsClientsBlogModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export class ServicesUserModule {}
