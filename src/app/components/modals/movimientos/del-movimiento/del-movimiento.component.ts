import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Movimiento } from '../../../../models/movimiento.model';

@Component({
  selector: 'app-del-movimiento',
  templateUrl: './del-movimiento.component.html',
  styleUrls: ['./del-movimiento.component.css']
})
export class DelMovimientoComponent {
  @Input() movimiento!: Movimiento;

  constructor(
    public dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar el movimiento con descripción ${this.movimiento.transaction}?`
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteMovimiento();
      }
    });
  }

  async deleteMovimiento(): Promise<void> {
    try {
      if (this.movimiento.id) {
        await this.supabaseService.deleteMovimiento(this.movimiento.id);
        console.log('Movimiento eliminado');
      }
    } catch (error) {
      console.error('Error al eliminar el movimiento', error);
    }
  }
}
