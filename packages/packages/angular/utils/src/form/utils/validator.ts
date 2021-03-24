import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  validator as sxValidator,
  validateWithErrors,
} from '@sinbix-common/validator';

export class Validator {
  static validate(schema: sxValidator.AnySchema): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let error = null;
      const errors = validateWithErrors(schema, control.value);

      if (errors?.length) {
        error = { [errors[0].message]: true };
      }

      return error;
    };
  }
}
