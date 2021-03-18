import {
  SchemaMap,
  validateWithErrors,
  ValidationOptions,
  validator,
} from '@sinbix-common/validator';
import { BadRequestException, ValidatorException } from '../exceptions';

export function validateOrException(
  schema: SchemaMap,
  value: any,
  exception?: typeof ValidatorException,
  options?: ValidationOptions
) {
  const errors = validateWithErrors(validator.object(schema), value, options);
  if (errors) {
    throw new (exception ?? BadRequestException)(errors);
  }
}
