import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Tarjeta } from '../../../../models/tarjeta.model'

@Component({
  selector: 'app-mod-card',
  templateUrl: './mod-card.component.html',
  styleUrls: ['./mod-card.component.css']
})
export class ModCardComponent {
  tarjetaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tarjeta: Tarjeta },
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.tarjetaForm = this.fb.group({
      cardNumber: [data.tarjeta.cardNumber, Validators.required],
      expirationDate: [data.tarjeta.expirationDate, Validators.required]
    });
  }

  onSubmit() {
    if (this.tarjetaForm.valid) {
      const updatedFields = this.tarjetaForm.value;
      const tarjetaId = this.data.tarjeta.id;

      if (tarjetaId !== undefined) {
        this.supabaseService.updateTarjeta(tarjetaId, updatedFields)
          .then(() => {
            console.log('Tarjeta actualizada con éxito');
            this.dialogRef.close();
          })
          .catch(error => {
            console.error('Error al actualizar tarjeta:', error);
            // Manejar el error, mostrar un mensaje al usuario, etc.
          });
      } else {
        console.error('El id de la tarjeta es undefined');
        // Manejar el caso en que el id de la tarjeta sea undefined
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
