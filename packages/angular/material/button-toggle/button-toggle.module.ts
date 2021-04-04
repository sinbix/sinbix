import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToggleButtonIconComponent } from './icon';

@NgModule({
  declarations: [ToggleButtonIconComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ToggleButtonIconComponent],
})
export class SmatButtonToggleModule {}
