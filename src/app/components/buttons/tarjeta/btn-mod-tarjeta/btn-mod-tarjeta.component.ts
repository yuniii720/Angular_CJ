import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Agrega esta línea
import { ModCardComponent } from '../../../modals/tarjetas/mod-card/mod-card.component';

@Component({
  selector: 'app-btn-mod-tarjeta',
  templateUrl: './btn-mod-tarjeta.component.html',
  styleUrls: ['./btn-mod-tarjeta.component.css'] 
})
export class BtnModTarjetaComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModCardComponent, {
      width: '600px',
      data: { },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}