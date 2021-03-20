import { RpcException } from '@nestjs/microservices';
import { ValidationErrorItem } from '@sinbix-common/validator';
import { validatorException } from '../utils';

export function rcpException(errors: ValidationErrorItem[]) {
  return validatorException(RpcException, errors);
}
