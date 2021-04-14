import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error.component';

@Injectable()
export class ErrorService {
  constructor(private dialog: MatDialog) {}

  throwError(message: string) {
    this.dialog.open(ErrorComponent, {
      autoFocus: false,
      data: { message },
    });
  }
}
