import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  validator as sxValidator,
  validateWithErrors,
} from '@sinbix-common/validator';

export function validate(
  key: string,
  schema: sxValidator.ObjectSchema
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let error = null;

    const parent = control.parent;

    if (parent) {
      const errors = validateWithErrors(schema, parent.getRawValue(), {
        abortEarly: false,
      });

      if (errors?.length) {
        errors.forEach((err) => {
          const field = err.context.key;
          if (field !== key) {
            if (err.context['valids']?.length) {
              parent.get(field).updateValueAndValidity();
            }
          } else {
            error = { [err.message]: true };
          }
        });
      }
    }

    return error;
  };
}
