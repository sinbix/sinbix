import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dictionary } from '@sinbix-common/utils';
import * as _ from 'lodash';
import { SxFormStore } from './form-store';
import { FormField, Validator } from './utils';

@Injectable()
export class SxFormBuilder {
  constructor(private formBuilder: FormBuilder) {}

  store(fields: Dictionary<FormField>): SxFormStore {
    return new SxFormStore(
      this.formBuilder.group(this.getFormControlsFromFields(fields))
    );
  }

  private getFormControlsFromFields(fields: Dictionary<FormField>) {
    const formControls = {};
    _.keys(fields).forEach((key) => {
      formControls[key] = [fields?.[key][0]];
      if (fields[key][1]) {
        formControls[key][1] = Validator.validate(fields?.[key][1]);
      }
    });
    return formControls;
  }
}
