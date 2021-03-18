import { AnySchema, ValidationOptions } from '@hapi/joi';
import { validateWithErrors } from './validate-with-errors';

export function validate(
  schema: AnySchema,
  value: any,
  options?: ValidationOptions
): boolean {
  if (validateWithErrors(schema, value, options)) {
    return false;
  }
  return true;
}
