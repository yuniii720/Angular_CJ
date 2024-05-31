import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../modals/confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Tarjeta } from '../../../../models/tarjeta.model';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-btn-del-tarjeta',
  templateUrl: './btn-del-tarjeta.component.html',
  styleUrls: ['./btn-del-tarjeta.component.css']
})
export class BtnDelTarjetaComponent {
  @Input() tarjetaSeleccionada?: Tarjeta;
  @Output() tarjetaEliminada: EventEmitter<Tarjeta> = new EventEmitter<Tarjeta>();

  constructor(
    private dialog: MatDialog,
    private supabaseService: SupabaseService,
    private alertService: AlertService
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
        this.alertService.success('Tarjeta eliminada con éxito.');
        this.tarjetaEliminada.emit(this.tarjetaSeleccionada);
      } else {
        this.alertService.error('Error al eliminar la tarjeta.');
        console.error('Error al eliminar la tarjeta');
      }
    } catch (error) {
      this.alertService.error('Error al eliminar la tarjeta.');
      console.error('Error al eliminar la tarjeta', error);
    }
  }
}
