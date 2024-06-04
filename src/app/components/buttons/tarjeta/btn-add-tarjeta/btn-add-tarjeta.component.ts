import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { AddCardComponent } from '../../../modals/tarjetas/add-card/add-card.component';


@Component({
  selector: 'app-btn-add-tarjeta',
  templateUrl: './btn-add-tarjeta.component.html',
  styleUrls: ['./btn-add-tarjeta.component.css'] 
})
export class BtnAddTarjetaComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCardComponent, {
      width: '600px',
      data: { },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
