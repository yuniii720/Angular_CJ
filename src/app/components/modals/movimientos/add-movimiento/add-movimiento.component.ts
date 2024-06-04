import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../../../../services/supabase.service';
import { Movimiento } from '../../../../models/movimiento.model';
import { AlertService } from '../../../../services/alert.service';
import { Cuenta } from '../../../../models/cuenta.model';

@Component({
  selector: 'app-add-movimiento',
  templateUrl: './add-movimiento.component.html',
  styleUrls: ['./add-movimiento.component.css']
})
export class AddMovimientoComponent implements OnInit {
  movimientoForm: FormGroup;
  cuentas: Cuenta[] = []; // Lista de cuentas disponibles

  constructor(
    public dialogRef: MatDialogRef<AddMovimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private supabaseService: SupabaseService,
    private alertService: AlertService
  ) {
    this.movimientoForm = this.formBuilder.group({
      account_id: ['', Validators.required],
      transaction: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      date: [new Date(), Validators.required],
      channel: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.cuentas = await this.supabaseService.getAllCuentas();
    } catch (error) {
      console.error('Error loading accounts', error);
      this.alertService.error('Error al cargar las cuentas');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.movimientoForm.valid) {
      const nuevoMovimiento: Movimiento = this.movimientoForm.value;

      try {
        const { data, error } = await this.supabaseService.addMovimiento(nuevoMovimiento);
        if (error) throw error;

        this.alertService.success('Movimiento añadido correctamente');
        this.dialogRef.close(data); // Devuelve el nuevo movimiento al cerrar el diálogo
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
