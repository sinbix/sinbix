import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SxFormBuilder, SxFormStore } from '@sinbix-angular/common/form';
import { validator } from '@sinbix-common/validator';
import { AuthService } from '@sinbix/demo/ng/data-access/auth';
import {
  FIRST_NAME_VALIDATOR,
  LAST_NAME_VALIDATOR,
  EMAIL_VALIDATOR,
  PASSWORD_VALIDATOR,
  MIN_PASSWORD,
  MAX_PASSWORD,
} from '@sinbix/demo/shared/utils/user';
import * as _ from 'lodash';

@Component({
  selector: 'client-web-features-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  formStore: SxFormStore;

  minPassword = MIN_PASSWORD;

  maxPassword = MAX_PASSWORD;

  constructor(
    private titleService: Title,
    private sxFormBuilder: SxFormBuilder,
    private authService: AuthService
  ) {}

  hidePassword = true;

  ngOnInit(): void {
    this.titleService.setTitle('Demo | Register');
    this.formStore = this.sxFormBuilder.store({
      firstName: ['', FIRST_NAME_VALIDATOR.required()],
      lastName: ['', LAST_NAME_VALIDATOR.required()],
      email: ['', EMAIL_VALIDATOR.required()],
      password: ['', PASSWORD_VALIDATOR.required()],
      passwordConfirm: [
        '',
        validator
          .equal(validator.ref('password'))
          .messages({ 'any.only': 'Passwords do not match' }),
      ],
    });
  }

  onRegister() {
    if (this.formStore.form.valid) {
      const {
        firstName,
        lastName,
        email,
        password,
      } = this.formStore.getValues();

      this.authService.signup({
        data: {
          email,
          password,
          firstName,
          lastName,
        },
      });
    }
  }

  onToggleHidePassword(active: boolean) {
    this.hidePassword = active;
  }
}
