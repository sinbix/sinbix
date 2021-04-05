import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiMaterialModule } from '@sinbix/sinbix/ng/ui/material';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list';
import { ItemComponent } from './item';

@NgModule({
  declarations: [ListComponent, ItemComponent],
  imports: [CommonModule, UiMaterialModule, FormsModule],
  exports: [ListComponent, ItemComponent],
})
export class UiProjectsModule {}
