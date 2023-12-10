import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModelComponent } from './delete-model/delete-model.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteModelServiceService {

  constructor(private dialog: MatDialog) { }

  openConfirmationDialog(message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(DeleteModelComponent, {
      data: {message}
    });

    return dialogRef.afterClosed().toPromise().then((result) => result === true)
  }
}
