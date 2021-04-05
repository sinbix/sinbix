import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HOME_ROUTES } from './home.routes';

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forChild(HOME_ROUTES), CommonModule],
  exports: [HomeComponent],
})
export class HomeModule {}
