import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-users',
  templateUrl: './save-users.component.html',
  styleUrls: ['./save-users.component.css']
})
export class SaveUsersComponent {

  constructor(public dialogRef: MatDialogRef<SaveUsersComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
