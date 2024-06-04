import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../../../services/supabase.service';
import { Movimiento } from '../../../../models/movimiento.model';
import { AlertService } from '../../../../services/alert.service'; // Importa el servicio de alertas

@Component({
  selector: 'app-add-movimiento',
  templateUrl: './add-movimiento.component.html',
  styleUrls: ['./add-movimiento.component.css']
})
export class AddMovimientoComponent {
  movimientoForm: FormGroup;
  account_id: number; // ID de la cuenta seleccionada

  constructor(
    public dialogRef: MatDialogRef<AddMovimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private alertService: AlertService
  ) {
    this.account_id = data.account_id; // Recibe el ID de la cuenta desde el componente padre
    this.movimientoForm = this.formBuilder.group({
      transaction: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      date: [new Date(), Validators.required],
      channel: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.movimientoForm.valid) {
      const nuevoMovimiento: Movimiento = {
        ...this.movimientoForm.value,
        account_id: this.account_id
      };

      try {
        const { data, error } = await this.supabaseService.addMovimiento(nuevoMovimiento); // Llamar al nuevo método
        if (error) throw error; // Lanza el error si existe para que sea capturado en el catch

        this.alertService.success('Movimiento añadido correctamente');
        this.dialogRef.close();
      } catch (error) {
        console.error('Error al añadir movimiento', error);
        this.alertService.error('Error al añadir movimiento');
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
