import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list';
import { ItemComponent } from './item';
import { DepsGraphUiMaterialModule } from '../material';

@NgModule({
  declarations: [ListComponent, ItemComponent],
  imports: [CommonModule, DepsGraphUiMaterialModule],
  exports: [ListComponent, ItemComponent],
})
export class DepsGraphUiProjectsModule {}
