import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModCardComponent } from '../../../modals/tarjetas/mod-card/mod-card.component';
import { Tarjeta } from '../../../../models/tarjeta.model';

@Component({
  selector: 'app-btn-mod-tarjeta',
  templateUrl: './btn-mod-tarjeta.component.html',
  styleUrls: ['./btn-mod-tarjeta.component.css']
})
export class BtnModTarjetaComponent {
  @Input() tarjetaSeleccionada?: Tarjeta;

  constructor(public dialog: MatDialog) { }

  openModCardDialog(): void {
    if (!this.tarjetaSeleccionada) {
      console.error('No hay tarjeta seleccionada para modificar');
      return;
    }

    const dialogRef = this.dialog.open(ModCardComponent, {
      width: '600px',
      data: { tarjeta: this.tarjetaSeleccionada }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('La tarjeta fue actualizada');
        // Opcionalmente, recargar la lista de tarjetas
      }
    });
  }
}
