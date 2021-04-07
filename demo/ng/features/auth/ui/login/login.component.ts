import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SxFormBuilder, SxFormStore } from '@sinbix-angular/common/form';
import { AuthService } from '@sinbix/demo/ng/data-access/auth';
import {
  EMAIL_VALIDATOR,
  MAX_PASSWORD,
  MIN_PASSWORD,
  PASSWORD_VALIDATOR,
} from '@sinbix/demo/shared/utils/user';

@Component({
  selector: 'client-web-features-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
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
    this.titleService.setTitle('Demo | Login');
    this.formStore = this.sxFormBuilder.store({
      email: ['', EMAIL_VALIDATOR.required()],
      password: ['', PASSWORD_VALIDATOR.required()],
    });
  }

  onLogin() {
    if (this.formStore.form.valid) {
      const { email, password } = this.formStore.getValues();

      this.authService.signin({
        data: {
          email,
          password,
        },
      });
    }
  }

  onToggleHidePassword(active: boolean) {
    this.hidePassword = active;
  }
}
