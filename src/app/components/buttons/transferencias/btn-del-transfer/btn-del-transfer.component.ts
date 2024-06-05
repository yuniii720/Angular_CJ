import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../modals/confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Transferencia } from '../../../../models/transferencia.model';

@Component({
  selector: 'app-btn-del-transfer',
  templateUrl: './btn-del-transfer.component.html',
  styleUrls: ['./btn-del-transfer.component.css']
})
export class BtnDelTransferComponent {
  @Input() transferencia!: Transferencia;  // Asegúrate de pasar el objeto Transferencia

  constructor(
    private dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar la transferencia de ${this.transferencia.amount} ${this.transferencia.currency}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTransfer();
      }
    });
  }

  private async deleteTransfer(): Promise<void> {
    try {
      await this.supabaseService.deleteTransfer(this.transferencia.id!);
      console.log('Transferencia eliminada');
    } catch (error) {
      console.error('Error al eliminar la transferencia', error);
    }
  }
}
