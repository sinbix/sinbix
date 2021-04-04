import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SxFormBuilder, SxFormStore } from '@sinbix-angular/utils/form';
import { validator } from '@sinbix-common/validator';
import { AuthService } from '@sinbix/demo/apps/ng/client-web/data-access';
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

  constructor(
    private titleService: Title,
    private sxFormBuilder: SxFormBuilder,
    private authService: AuthService
  ) {}

  hidePassword = true;

  ngOnInit(): void {
    this.titleService.setTitle('Demo | Register');
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
