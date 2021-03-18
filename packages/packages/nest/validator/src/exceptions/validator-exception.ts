import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidatorException extends HttpException {
  constructor(errors: any, code: number = HttpStatus.BAD_REQUEST) {
    super({ errors, code, type: 'validator' }, code);
    delete this.stack;
  }
}
