import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Tarjeta } from '../../../../models/tarjeta.model';

@Component({
  selector: 'app-del-card',
  templateUrl: './del-card.component.html',
  styleUrls: ['./del-card.component.css']
})
export class DelCardComponent {
openConfirmDialog: any;

  constructor(
    public dialogRef: MatDialogRef<DelCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tarjeta: Tarjeta },
    private supabaseService: SupabaseService
  ) {}

  deleteCard() {
    const tarjetaId = this.data.tarjeta.id;

    if (tarjetaId !== undefined) {
      this.supabaseService.deleteTarjeta(tarjetaId)
        .then(() => {
          console.log('Tarjeta eliminada con éxito');
          this.dialogRef.close();
        })
        .catch(error => {
          console.error('Error al eliminar tarjeta:', error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        });
    } else {
      console.error('El id de la tarjeta es undefined');
      // Manejar el caso en que el id de la tarjeta sea undefined
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
