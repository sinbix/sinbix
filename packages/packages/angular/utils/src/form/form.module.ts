import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SxFormBuilder } from './form-builder';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  providers: [SxFormBuilder],
  exports: [FormsModule, ReactiveFormsModule],
})
export class SxFormModule {}
