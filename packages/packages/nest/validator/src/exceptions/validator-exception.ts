import { HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class ValidatorException extends Error {
  constructor(errors: any, code: number = HttpStatus.BAD_REQUEST) {
    super()
    // super({ errors, code, type: 'validator' }, code);
    // delete this.stack;
  }
}
