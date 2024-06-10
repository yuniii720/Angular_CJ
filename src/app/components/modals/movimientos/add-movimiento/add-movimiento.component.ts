import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../../../services/supabase.service';
import { Movimiento } from '../../../../models/movimiento.model';
import Swal from 'sweetalert2';
import { Cuenta } from '../../../../models/cuenta.model';
import { AuthService } from '../../../../services/auth.service';  // Importa el servicio de autenticación

@Component({
  selector: 'app-add-movimiento',
  templateUrl: './add-movimiento.component.html',
  styleUrls: ['./add-movimiento.component.css']
})
export class AddMovimientoComponent implements OnInit {
  movimientoForm: FormGroup;
  cuentas: Cuenta[] = [];  // Lista de cuentas disponibles

  constructor(
    public dialogRef: MatDialogRef<AddMovimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private authService: AuthService  // Inyecta el servicio de autenticación
  ) {
    this.movimientoForm = this.formBuilder.group({
      account_id: ['', Validators.required],
      transaction: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      date: [new Date(), Validators.required],
      channel: ['', Validators.required],
      category: ['', Validators.required],
      status: ['Processing']
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      const userId = this.authService.getUserId();
      if (userId) {
        this.cuentas = await this.supabaseService.getCuentasByUserId(userId);
      }
    } catch (error) {
      console.error('Error loading accounts', error);
      Swal.fire('Error', 'Error al cargar las cuentas', 'error');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.movimientoForm.valid) {
      const nuevoMovimiento: Movimiento = this.movimientoForm.value;

      try {
        const response = await this.supabaseService.addMovimiento(nuevoMovimiento);
        const { data, error } = response;
        if (error) throw error;

        if (data) {
          setTimeout(async () => {
            try {
              await this.supabaseService.updateMovimientoStatus(data.id!, 'Success');
            } catch (updateError) {
              console.error('Error al actualizar el estado del movimiento', updateError);
              Swal.fire('Error', 'Error al actualizar el estado del movimiento', 'error');
            }
          }, 10000);

          Swal.fire('Éxito', 'Movimiento añadido correctamente', 'success');
          this.dialogRef.close(data);
        }
      } catch (error) {
        console.error('Error al añadir movimiento', error);
        Swal.fire('Error', 'Error al añadir movimiento', 'error');
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
