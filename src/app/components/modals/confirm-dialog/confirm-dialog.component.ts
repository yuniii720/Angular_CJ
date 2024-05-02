import { Component, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupsComponent } from '../../popups/popups.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements AfterViewInit {
  title: string;
  message: string;

  @ViewChild(PopupsComponent) popupsComponent!: PopupsComponent;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  ngAfterViewInit(): void {
    if (this.popupsComponent) {
      this.popupsComponent.mostrarPopup();
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export interface ConfirmDialogData {
  title: string;
  message: string;
}
