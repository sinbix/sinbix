import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiMaterialModule } from '@sinbix/demo/ng/ui/material';
import { SxFormModule } from '@sinbix-angular/common/form';
import { LoginComponent, RegisterComponent } from './ui';

import { AuthComponent } from './auth.component';
import { AUTH_ROUTES } from './auth.routes';

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
