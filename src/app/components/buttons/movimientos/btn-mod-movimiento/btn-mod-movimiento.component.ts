import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModMovimientoComponent } from '../../../modals/movimientos/mod-movimiento/mod-movimiento.component'; // Asegúrate de tener este componente
import { Movimiento } from '../../../../models/movimiento.model';

@Component({
  selector: 'app-btn-mod-movimiento',
  templateUrl: './btn-mod-movimiento.component.html',
  styleUrls: ['./btn-mod-movimiento.component.css']
})
export class BtnModMovimientoComponent {
  @Input() movimiento!: Movimiento; // Recibimos el objeto Movimiento

  constructor(private dialog: MatDialog) {}

  openModMovimientoDialog(): void {
    const dialogRef = this.dialog.open(ModMovimientoComponent, {
      width: '600px', // Ajusta el ancho según tus necesidades
      data: this.movimiento // Pasa el objeto Movimiento al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El movimiento fue actualizado');
        // Opcionalmente, recargar la lista de movimientos
      }
    });
  }
}
