import { AnySchema, ValidationErrorItem, ValidationOptions } from 'joi';

export function validateWithErrors(
  schema: AnySchema,
  value: any,
  options?: ValidationOptions
): ValidationErrorItem[] {
  let errors;

  const { error } = schema.validate(value, options);

  if (error) {
    errors = error.details;
  }

  return errors;
}
