import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../modals/confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Movimiento } from '../../../../models/movimiento.model'; // Asegúrate de tener este modelo

@Component({
  selector: 'app-btn-del-movimiento',
  templateUrl: './btn-del-movimiento.component.html',
  styleUrls: ['./btn-del-movimiento.component.css']
})
export class BtnDelMovimientoComponent {
  @Input() movimiento!: Movimiento; // Recibimos el objeto Movimiento

  constructor(
    private dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar el movimiento "${this.movimiento.transaction}"?`
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
      const { error } = await this.supabaseService.deleteMovimiento(this.movimiento.id);
      if (error) throw error; // Lanza el error para que sea capturado en el catch

      console.log('Movimiento eliminado');
      // Puedes realizar acciones adicionales después de la eliminación, como actualizar la lista de movimientos
    } catch (error) {
      console.error('Error al eliminar el movimiento', error);
      // Puedes mostrar un mensaje de error al usuario
    }
  }
}
