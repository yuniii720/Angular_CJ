import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tarjeta } from '../../../../models/tarjeta.model';

@Component({
  selector: 'app-see-card',
  templateUrl: './see-card.component.html',
  styleUrls: ['./see-card.component.scss']
})
export class SeeCardComponent {
  constructor(
    public dialogRef: MatDialogRef<SeeCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tarjeta: Tarjeta }
  ) {}

  onNoClick(event: MouseEvent): void {
    event.stopPropagation();
    this.dialogRef.close();
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}
