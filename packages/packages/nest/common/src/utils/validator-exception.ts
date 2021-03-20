import { ValidationErrorItem } from '@sinbix-common/validator';

export function validatorException(
  exceptionType: any,
  errors: ValidationErrorItem[]
) {
  return new exceptionType(`Validatation failed: ${JSON.stringify(errors)}`);
}
