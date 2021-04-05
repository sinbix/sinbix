import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list';
import { ItemComponent } from './item';
import { UiMaterialModule } from '../material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, ItemComponent],
  imports: [CommonModule, UiMaterialModule, FormsModule],
  exports: [ListComponent, ItemComponent],
})
export class UiProjectsModule {}
