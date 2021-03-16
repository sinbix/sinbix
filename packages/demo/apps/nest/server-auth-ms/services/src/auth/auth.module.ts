import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [AuthService],
  exports: [AuthService],
})
export class ServicesAuthModule {}
