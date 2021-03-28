import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list';
import { UiMaterialModule } from '../material';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, UiMaterialModule],
  exports: [ListComponent],
})
export class UiPostModule {}
