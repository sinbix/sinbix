import { BadRequestException } from '@nestjs/common';
import { ValidationErrorItem } from '@sinbix-common/validator';
import { validatorException } from '../utils';

export function httpException(errors: ValidationErrorItem[]) {
  return validatorException(BadRequestException, errors);
}
