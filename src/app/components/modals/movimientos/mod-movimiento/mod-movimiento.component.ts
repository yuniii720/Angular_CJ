import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Movimiento } from '../../../../models/movimiento.model';
import { Cuenta } from '../../../../models/cuenta.model';
import Swal from 'sweetalert2';  // Importa SweetAlert
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mod-movimiento',
  templateUrl: './mod-movimiento.component.html',
  styleUrls: ['./mod-movimiento.component.css']
})
export class ModMovimientoComponent implements OnInit, OnDestroy {
  movimientoForm: FormGroup;
  subs: Subscription = new Subscription();
  cuentas: Cuenta[] = [];

  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  constructor(
    public dialogRef: MatDialogRef<ModMovimientoComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: Movimiento
  ) {
    // Se inicializa el FormGroup con valores vacíos o valores predeterminados
    this.movimientoForm = new FormGroup({
      account_id: new FormControl('', Validators.required),
      transaction: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]),
      date: new FormControl('', Validators.required),
      channel: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
  }

  async ngOnInit(): Promise<void> {
    // Se cargan los datos del movimiento en el formulario al inicializar el componente
    this.movimientoForm.patchValue({
      account_id: this.data.account_id,
      transaction: this.data.transaction,
      amount: this.data.amount,
      date: this.data.date ? new Date(this.data.date) : undefined,
      channel: this.data.channel,
      category: this.data.category
    });

    try {
      this.cuentas = await this.supabaseService.getAllCuentas();
    } catch (error) {
      console.error('Error loading accounts', error);
      Swal.fire('Error', 'Error al cargar las cuentas', 'error');  // SweetAlert de error
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    if (this.movimientoForm.valid) {
      const formValue = this.movimientoForm.value;
      const updatedMovimientoData: Partial<Movimiento> = {
        account_id: formValue.account_id,
        transaction: formValue.transaction,
        amount: formValue.amount,
        date: formValue.date ? new Date(formValue.date) : undefined,
        channel: formValue.channel,
        category: formValue.category
      };

      try {
        // Verificar que el ID del movimiento no sea undefined
        if (!this.data.id) {
          throw new Error('El ID del movimiento es indefinido.');
        }

        // Actualizar el movimiento
        await this.supabaseService.updateMovimiento(this.data.id, updatedMovimientoData);
        Swal.fire('Éxito', 'Movimiento actualizado correctamente', 'success');  // SweetAlert de éxito
        this.dialogRef.close(updatedMovimientoData);
      } catch (error) {
        console.error('Error al actualizar el movimiento', error);
        Swal.fire('Error', 'Error al actualizar el movimiento. Por favor, intente de nuevo.', 'error');  // SweetAlert de error
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
