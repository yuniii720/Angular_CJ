import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../../../services/supabase.service';
import Swal from 'sweetalert2';  // Importa SweetAlert
import { Cuenta } from '../../../../models/cuenta.model';

@Component({
  selector: 'app-add-transfer',
  templateUrl: './add-transfer.component.html',
  styleUrls: ['./add-transfer.component.css']
})
export class AddTransferComponent implements OnInit {
  transferForm: FormGroup;
  cuentas: Cuenta[] = []; // Lista de cuentas disponibles

  constructor(
    public dialogRef: MatDialogRef<AddTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.transferForm = this.formBuilder.group({
      from_account: ['', Validators.required],
      to_account: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      currency: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.cuentas = await this.supabaseService.getAllCuentas();
    } catch (error) {
      console.error('Error loading accounts', error);
      Swal.fire('Error', 'Error al cargar las cuentas', 'error');  // SweetAlert de error
    }
  }

  async onSubmit(): Promise<void> {
    if (this.transferForm.valid) {
      const nuevaTransferencia = this.transferForm.value;

      try {
        const response = await this.supabaseService.addTransfer(nuevaTransferencia);
        const { data, error } = response;
        if (error) throw error;

        if (data) {
          Swal.fire('Éxito', 'Transferencia añadida correctamente', 'success');  // SweetAlert de éxito
          this.dialogRef.close(data);
        }
      } catch (error) {
        console.error('Error al añadir transferencia', error);
        Swal.fire('Error', 'Error al añadir transferencia', 'error');  // SweetAlert de error
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
