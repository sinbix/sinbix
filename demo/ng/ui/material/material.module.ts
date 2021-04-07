import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SmatButtonToggleModule } from '@sinbix-angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    SmatButtonToggleModule,
    MatMenuModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatDialogModule,
    MatSortModule,
    MatDividerModule,
  ],
})
export class UiMaterialModule {}
