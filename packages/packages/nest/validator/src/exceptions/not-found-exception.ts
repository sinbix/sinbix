import { HttpStatus } from '@nestjs/common';
import { ValidatorException } from './validator-exception';

export class NotFoundException extends ValidatorException {
  constructor(errors: any) {
    super(errors, HttpStatus.NOT_FOUND);
  }
}
