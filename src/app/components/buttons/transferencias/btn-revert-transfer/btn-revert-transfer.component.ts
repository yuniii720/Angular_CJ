import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RevertTransferComponent } from '../../../modals/transferencias/revert-transfer/revert-transfer.component'; // Asegúrate de tener este componente
import { Transferencia } from '../../../../models/transferencia.model';

@Component({
  selector: 'app-btn-revert-transfer',
  templateUrl: './btn-revert-transfer.component.html',
  styleUrls: ['./btn-revert-transfer.component.css']
})
export class BtnRevertTransferComponent {
  @Input() transferencia!: Transferencia; // Recibimos el objeto Transferencia

  constructor(private dialog: MatDialog) {}

  openRevertTransferDialog(): void {
    const dialogRef = this.dialog.open(RevertTransferComponent, {
      width: '400px', // Ajusta el ancho según tus necesidades
      data: this.transferencia // Pasa el objeto Transferencia al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('La transferencia fue revertida');
        // Opcionalmente, recargar la lista de transferencias
      }
    });
  }
}
