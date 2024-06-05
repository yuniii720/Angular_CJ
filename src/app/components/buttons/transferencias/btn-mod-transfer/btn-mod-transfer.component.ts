import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModTransferComponent } from '../../../modals/transferencias/mod-transfer/mod-transfer.component'; // Asegúrate de tener este componente
import { Transferencia } from '../../../../models/transferencia.model';

@Component({
  selector: 'app-btn-mod-transfer',
  templateUrl: './btn-mod-transfer.component.html',
  styleUrls: ['./btn-mod-transfer.component.css']
})
export class BtnModTransferComponent {
  @Input() transferencia!: Transferencia; // Recibimos el objeto Transferencia

  constructor(private dialog: MatDialog) {}

  openModTransferDialog(): void {
    const dialogRef = this.dialog.open(ModTransferComponent, {
      width: '600px', // Ajusta el ancho según tus necesidades
      data: this.transferencia // Pasa el objeto Transferencia al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('La transferencia fue actualizada');
        // Opcionalmente, recargar la lista de transferencias
      }
    });
  }
}
