import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ROUTES } from './utils';

@NgModule({
  declarations: [HomeComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule],
  exports: [HomeComponent],
})
export class HomeModule {}
