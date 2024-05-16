import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ModCardComponent } from '../../../modals/tarjetas/mod-card/mod-card.component';
import { Tarjeta } from '../../../../models/tarjeta.model'; // Asegúrate de importar correctamente el tipo Tarjeta

@Component({
  selector: 'app-btn-mod-tarjeta',
  templateUrl: './btn-mod-tarjeta.component.html',
  styleUrls: ['./btn-mod-tarjeta.component.css'] 
})
export class BtnModTarjetaComponent {
  tarjetaSeleccionada?: Tarjeta; // Usa el operador '?' para indicar que podría ser nulo

  constructor(public dialog: MatDialog) { }

  openDialog(tarjeta: Tarjeta): void {
    this.tarjetaSeleccionada = tarjeta; // Asigna el valor dentro de la función openDialog

    const dialogRef = this.dialog.open(ModCardComponent, {
      width: '600px',
      data: { tarjeta: this.tarjetaSeleccionada },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
