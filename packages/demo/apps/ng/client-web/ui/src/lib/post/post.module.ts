import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SxFormModule } from '@sinbix-angular/utils';
import { ListComponent } from './list';
import { UiMaterialModule } from '../material';
import { PostDialogsFormComponent } from './dialogs';
import { PostDialogsDeleteComponent } from './dialogs/delete/delete.component';

@NgModule({
  declarations: [ListComponent, PostDialogsFormComponent, PostDialogsDeleteComponent],
  imports: [CommonModule, UiMaterialModule, SxFormModule],
  exports: [ListComponent, PostDialogsFormComponent],
})
export class UiPostModule {}
