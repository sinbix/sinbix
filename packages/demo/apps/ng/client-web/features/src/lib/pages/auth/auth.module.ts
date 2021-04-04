import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiMaterialModule } from '@sinbix/demo/apps/ng/client-web/ui';
import { SxFormModule } from '@sinbix-angular/common/form';

import { AuthComponent } from './auth.component';
import { AUTH_ROUTES } from './auth.routes';
import { LoginComponent } from './pages/login';
import { RegisterComponent } from './pages/register';

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
