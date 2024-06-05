import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../modals/confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Movimiento } from '../../../../models/movimiento.model';

@Component({
  selector: 'app-btn-del-movimiento',
  templateUrl: './btn-del-movimiento.component.html',
  styleUrls: ['./btn-del-movimiento.component.css']
})
export class BtnDelMovimientoComponent {
  @Input() movimiento!: Movimiento;  // Asegúrate de pasar el objeto Movimiento

  constructor(
    private dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar el movimiento con descripción ${this.movimiento.transaction}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMovimiento();
      }
    });
  }

  private async deleteMovimiento(): Promise<void> {
    try {
      await this.supabaseService.deleteMovimiento(this.movimiento.id!);
      console.log('Movimiento eliminado');
    } catch (error) {
      console.error('Error al eliminar el movimiento', error);
    }
  }
}
