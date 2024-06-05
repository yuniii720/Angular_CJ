import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../../../services/supabase.service';
import { Transferencia } from '../../../../models/transferencia.model';
import Swal from 'sweetalert2';  // Importa SweetAlert

@Component({
  selector: 'app-add-transfer',
  templateUrl: './add-transfer.component.html',
  styleUrls: ['./add-transfer.component.css']
})
export class AddTransferComponent implements OnInit {
  transferForm: FormGroup;
  cuentas: any[] = []; // Lista de cuentas disponibles

  constructor(
    public dialogRef: MatDialogRef<AddTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.transferForm = this.formBuilder.group({
      from_account_id: ['', Validators.required],
      to_account_id: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      currency: ['', Validators.required],
      description: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.cuentas = await this.supabaseService.getAllCuentas();
      console.log(this.cuentas);
    } catch (error) {
      console.error('Error loading accounts', error);
      Swal.fire('Error', 'Error al cargar las cuentas', 'error');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.transferForm.valid) {
      const nuevaTransferencia: Transferencia = this.transferForm.value;

      try {
        const response = await this.supabaseService.addTransfer(nuevaTransferencia);
        const { data, error } = response;
        if (error) throw error;

        if (data) {
          Swal.fire('Éxito', 'Transferencia añadida correctamente', 'success');
          this.dialogRef.close(data);
        }
      } catch (error: any) { // Explicitly cast 'error' to 'any' type
        console.error('Error al añadir transferencia', error);
        Swal.fire('Error', error.message || 'Error al añadir transferencia', 'error');
      }
    } else {
      console.log('Formulario inválido:', this.transferForm);
      Object.keys(this.transferForm.controls).forEach(key => {
        console.log(key, this.transferForm.controls[key].errors);
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
