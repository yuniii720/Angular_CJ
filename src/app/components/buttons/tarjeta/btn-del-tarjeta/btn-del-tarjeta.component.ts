import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../modals/confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Tarjeta } from '../../../../models/tarjeta.model';

@Component({
  selector: 'app-btn-del-tarjeta',
  templateUrl: './btn-del-tarjeta.component.html',
  styleUrls: ['./btn-del-tarjeta.component.css']
})
export class BtnDelTarjetaComponent {
  @Input() tarjetaSeleccionada?: Tarjeta;

  constructor(
    private dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    if (!this.tarjetaSeleccionada) {
      console.error('No hay tarjeta seleccionada para eliminar');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar la tarjeta con número ${this.tarjetaSeleccionada.cardNumber}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTarjeta();
      }
    });
  }

  private async deleteTarjeta(): Promise<void> {
    if (!this.tarjetaSeleccionada || !this.tarjetaSeleccionada.id) {
      console.error('No hay tarjeta seleccionada o el id de la tarjeta es undefined');
      return;
    }

    try {
      const success = await this.supabaseService.deleteTarjeta(this.tarjetaSeleccionada.id);
      if (success) {
        console.log('Tarjeta eliminada con éxito');
      } else {
        console.error('Error al eliminar la tarjeta');
      }
    } catch (error) {
      console.error('Error al eliminar la tarjeta', error);
    }
  }
}
