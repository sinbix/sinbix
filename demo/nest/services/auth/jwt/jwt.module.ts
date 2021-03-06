import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@sinbix/demo/nest/db/auth';
import { EXPIRES_IN, SECRET_OR_KEY } from './utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: SECRET_OR_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN,
      },
    }),
  ],
  exports: [JwtModule],
})
export class AuthJwtModule {}
