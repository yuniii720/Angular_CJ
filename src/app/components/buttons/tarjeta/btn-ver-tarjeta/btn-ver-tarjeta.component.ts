import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SeeCardComponent } from '../../../modals/tarjetas/see-card/see-card.component';
import { Tarjeta } from '../../../../models/tarjeta.model';

@Component({
  selector: 'app-btn-ver-tarjeta',
  templateUrl: './btn-ver-tarjeta.component.html',
  styleUrls: ['./btn-ver-tarjeta.component.css']
})
export class BtnVerTarjetaComponent {
  @Input() tarjetaSeleccionada?: Tarjeta;

  constructor(public dialog: MatDialog) { }

  openCardDetailsDialog(): void {
    if (!this.tarjetaSeleccionada) {
      console.error('No hay tarjeta seleccionada para ver');
      return;
    }

    const dialogRef = this.dialog.open(SeeCardComponent, {
      width: '700px',
      height: '700px',
      panelClass: 'custom-dialog-container',  // Clase personalizada para estilos
      data: { tarjeta: this.tarjetaSeleccionada },
      maxWidth: '90vw',  // Ajustar el ancho máximo
      maxHeight: '90vh'  // Ajustar la altura máxima
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El diálogo de detalles de la tarjeta se cerró');
      } else {
        console.error('Error al cerrar el diálogo de detalles de la tarjeta');
      }
    });
  }
}
