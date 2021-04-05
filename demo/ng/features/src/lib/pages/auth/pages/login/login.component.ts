import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SxFormBuilder, SxFormStore } from '@sinbix-angular/common/form';
import { validator } from '@sinbix-common/validator';
import { AuthService } from '@sinbix/demo/ng/data-access';

@Component({
  selector: 'client-web-features-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
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
    this.titleService.setTitle('Demo | Login');
    this.formStore = this.sxFormBuilder.store({
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
