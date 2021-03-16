import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AUTH_ORMCONFIG from './auth.ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(AUTH_ORMCONFIG)],
})
export class DbAuthModule {}
