import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { UiMaterialModule } from '@sinbix/demo/apps/ng/client-web/ui';

import { AuthComponent } from './auth.component';
import { AUTH_ROUTES } from './auth.routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    RouterModule.forChild(AUTH_ROUTES),
    CommonModule,
    FormsModule,
    UiMaterialModule,
  ],
})
export class AuthModule {}
