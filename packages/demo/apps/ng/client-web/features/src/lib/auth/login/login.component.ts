import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SxFormBuilder, SxFormStore } from '@sinbix-angular/utils';
import { validator } from '@sinbix-common/validator';

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

  constructor(private sxFormBuilder: SxFormBuilder) {}

  hidePassword = true;

  ngOnInit(): void {
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

  onLogin() {}

  onToggleHidePassword(active: boolean) {
    this.hidePassword = active;
  }
}
