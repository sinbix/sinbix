import { HttpStatus } from '@nestjs/common';
import { ValidatorException } from './validator-exception';

export class UnauthorizedException extends ValidatorException {
  constructor(errors: any) {
    super(errors, HttpStatus.UNAUTHORIZED);
  }
}
