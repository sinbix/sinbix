import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Dictionary } from '@sinbix-common/utils';
import { validator as sxValidator } from '@sinbix-common/validator';
import * as _ from 'lodash';
import { SxFormStore } from './form-store';
import { FormField, validate } from './utils';

@Injectable()
export class SxFormBuilder {
  constructor(private formBuilder: FormBuilder) {}

  store(fields: Dictionary<FormField>): SxFormStore {
    return new SxFormStore(
      this.formBuilder.group(this.getFormControlsFromFields(fields))
    );
  }

  private getFormControlsFromFields(fields: Dictionary<FormField>) {
    const validators = {};
    const formControls = {};
    _.keys(fields).forEach((key) => {
      formControls[key] = [fields?.[key][0]];
      if (fields?.[key]?.[1]) {
        validators[key] = fields[key][1];
      }
    });

    _.keys(validators).forEach((key) => {
      formControls[key][1] = validate(key, sxValidator.object(validators));
    });

    return formControls;
  }
}
