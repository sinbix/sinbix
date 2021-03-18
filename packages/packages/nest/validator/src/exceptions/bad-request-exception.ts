import { HttpStatus } from '@nestjs/common';
import { ValidatorException } from './validator-exception';

export class BadRequestException extends ValidatorException {
  constructor(errors: any) {
    super(errors, HttpStatus.BAD_REQUEST);
  }
}
