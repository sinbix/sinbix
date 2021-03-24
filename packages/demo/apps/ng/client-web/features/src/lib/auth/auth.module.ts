import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AUTH_ROUTES } from './auth.routes';

@NgModule({
  declarations: [AuthComponent],
  imports: [RouterModule.forChild(AUTH_ROUTES), CommonModule],
})
export class AuthModule {}
