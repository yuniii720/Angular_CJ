import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Transferencia } from '../../../../models/transferencia.model';

@Component({
  selector: 'app-del-transfer',
  templateUrl: './del-transfer.component.html',
  styleUrls: ['./del-transfer.component.css']
})
export class DelTransferComponent {
  @Input() transferencia!: Transferencia;

  constructor(
    public dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar la transferencia de ${this.transferencia.amount} ${this.transferencia.currency}?`
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTransfer();
      }
    });
  }

  async deleteTransfer(): Promise<void> {
    try {
      if (this.transferencia.id) {
        await this.supabaseService.deleteTransfer(this.transferencia.id);
        console.log('Transferencia eliminada');
      }
    } catch (error) {
      console.error('Error al eliminar la transferencia', error);
    }
  }
}
