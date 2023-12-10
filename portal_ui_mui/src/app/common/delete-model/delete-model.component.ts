import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrls: ['./delete-model.component.scss']
})
export class DeleteModelComponent {

  constructor(public dialogRef: MatDialogRef<DeleteModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
