import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SmatNavHItemModule } from '../item';

import { NavHButtonsComponent } from './buttons.component';

@NgModule({
  declarations: [NavHButtonsComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, SmatNavHItemModule],
  exports: [NavHButtonsComponent],
})
export class SmatNavHButtonsModule {}
