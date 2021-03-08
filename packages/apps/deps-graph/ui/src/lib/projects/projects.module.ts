import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list';
import { ItemComponent } from './item';

@NgModule({
  declarations: [ListComponent, ItemComponent],
  imports: [CommonModule],
  exports: [ListComponent, ItemComponent],
})
export class DepsGraphUiProjectsModule {}
