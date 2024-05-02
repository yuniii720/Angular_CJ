import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    // Actualiza el título y el mensaje desde los datos pasados al diálogo
    this.title = data.title;
    this.message = data.message;
  }

  onConfirm(): void {
    // Cerrar el diálogo y devolver true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Cerrar el diálogo y devolver false
    this.dialogRef.close(false);
  }
}

export interface ConfirmDialogData {
  title: string;
  message: string;
}
