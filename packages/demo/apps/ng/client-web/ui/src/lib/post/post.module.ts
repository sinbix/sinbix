import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SxFormModule } from '@sinbix-angular/utils/form';
import { PostListComponent } from './list';
import { UiMaterialModule } from '../material';
import { PostDialogsFormComponent } from './dialogs';
import { PostDialogsDeleteComponent } from './dialogs/delete/delete.component';

@NgModule({
  declarations: [PostListComponent, PostDialogsFormComponent, PostDialogsDeleteComponent],
  imports: [CommonModule, UiMaterialModule, SxFormModule],
  exports: [PostListComponent, PostDialogsFormComponent],
})
export class UiPostModule {}
