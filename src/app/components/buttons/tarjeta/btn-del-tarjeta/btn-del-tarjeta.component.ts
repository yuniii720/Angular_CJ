import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Agrega esta línea
import { DelCardComponent } from '../../../modals/tarjetas/del-card/del-card.component';

@Component({
  selector: 'app-btn-del-tarjeta',
  templateUrl: './btn-del-tarjeta.component.html',
  styleUrls: ['./btn-del-tarjeta.component.css'] 
})
export class BtnDelTarjetaComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DelCardComponent, {
      width: '600px',
      data: { },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}