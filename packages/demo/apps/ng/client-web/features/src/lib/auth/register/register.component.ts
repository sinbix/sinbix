import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SxFormBuilder, SxFormStore } from '@sinbix-angular/utils';
import { validator } from '@sinbix-common/validator';
import * as _ from 'lodash';

@Component({
  selector: 'client-web-features-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  formStore: SxFormStore;

  minPassword = 8;

  maxPassword = 25;

  constructor(private sxFormBuilder: SxFormBuilder) {}

  hidePassword = true;

  ngOnInit(): void {
    this.formStore = this.sxFormBuilder.store({
      firstName: ['', validator.string().max(200).required()],
      lastName: ['', validator.string().max(200).required()],
      email: [
        '',
        validator
          .string()
          .email({ tlds: { allow: false } })
          .required(),
      ],
      password: [
        '',
        validator
          .string()
          .min(this.minPassword)
          .max(this.maxPassword)
          .required(),
      ],
      passwordConfirm: [
        '',
        validator
          .equal(validator.ref('password'))
          .messages({ 'any.only': 'Passwords do not match' }),
      ],
    });
  }

  onRegister() {
    console.log(this.formStore.form.valid);
    if (this.formStore.form.valid) {
      console.log('register');
    }
  }

  onToggleHidePassword(active: boolean) {
    this.hidePassword = active;
  }
}
