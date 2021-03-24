import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiMaterialModule } from '@sinbix/demo/apps/ng/client-web/ui';
import { SxFormModule } from '@sinbix-angular/utils';

import { AuthComponent } from './auth.component';
import { AUTH_ROUTES } from './auth.routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent],
  imports: [
    RouterModule.forChild(AUTH_ROUTES),
    CommonModule,
    SxFormModule,
    UiMaterialModule,
  ],
})
export class AuthModule {}
