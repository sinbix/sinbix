import { AbstractControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

export class SxFormStore {
  constructor(protected formGroup: FormGroup) {}

  get form(): FormGroup {
    return this.formGroup;
  }

  getField(controlName: string): AbstractControl {
    return this.formGroup?.get(controlName);
  }

  getValue(controlName: string) {
    return this.getField(controlName)?.value;
  }

  getValues() {
    return this.form.getRawValue();
  }

  getErrors(controlName: string) {
    return this.getField(controlName)?.errors;
  }

  getError(controlName: string) {
    const errors = this.getErrors(controlName);
    if (errors) {
      const error = _.keys(errors)[0];
      if (error) {
        return error;
      }
    }
    return null;
  }
}
