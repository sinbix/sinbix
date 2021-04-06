import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@sinbix/demo/nest/db/auth';
import { Repository } from 'typeorm';
import { JwtPayload, SECRET_OR_KEY } from './utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_OR_KEY,
    });
  }

  validate(payload: JwtPayload) {
    return this.userRepository.findOneOrFail(payload.userId);
  }
}
