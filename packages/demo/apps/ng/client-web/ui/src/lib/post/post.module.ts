import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SxFormModule } from '@sinbix-angular/utils';
import { ListComponent } from './list';
import { UiMaterialModule } from '../material';
import { PostDialogFormComponent } from './dialogs';

@NgModule({
  declarations: [ListComponent, PostDialogFormComponent],
  imports: [CommonModule, UiMaterialModule, SxFormModule],
  exports: [ListComponent, PostDialogFormComponent],
})
export class UiPostModule {}
