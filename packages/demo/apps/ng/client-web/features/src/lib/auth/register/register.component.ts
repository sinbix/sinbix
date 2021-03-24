import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {
  SxFormBuilder,
  SxFormModule,
  SxFormStore,
} from '@sinbix-angular/utils';
import { validator } from '@sinbix-common/validator';

@Component({
  selector: 'client-web-features-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  formStore: SxFormStore;

  constructor(private sxFormBuilder: SxFormBuilder) {}

  ngOnInit(): void {
    this.formStore = this.sxFormBuilder.store({
      firstName: ['', validator.string().max(200).required()],
      lastName: ['', validator.string().max(200).required()],
      email: ['', validator.string().max(200).required()],
      password: ['', validator.string().min(8).max(9).required()],
      // passwordconfirm: ['', validator.string().valid()],
    });
  }

  onRegister() {}
}
