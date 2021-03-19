import {
  SchemaMap,
  validateWithErrors,
  ValidationOptions,
  validator,
} from '@sinbix-common/validator';
import { BadRequestException, ValidatorException } from '../exceptions';
import { ErrorCallback } from './models';

export function validateOrException(
  schema: SchemaMap,
  value: any,
  errorCallback?: ErrorCallback,
  options?: ValidationOptions
) {
  const errors = validateWithErrors(validator.object(schema), value, options);
  if (errors) {
    if (errorCallback) {
      errorCallback(errors);
    }
  }
}
