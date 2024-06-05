import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Transferencia } from '../../../../models/transferencia.model';
import { Cuenta } from '../../../../models/cuenta.model';
import Swal from 'sweetalert2';  // Importa SweetAlert
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mod-transfer',
  templateUrl: './mod-transfer.component.html',
  styleUrls: ['./mod-transfer.component.css']
})
export class ModTransferComponent implements OnInit, OnDestroy {
  transferForm: FormGroup;
  subs: Subscription = new Subscription();
  cuentas: Cuenta[] = [];

  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  constructor(
    public dialogRef: MatDialogRef<ModTransferComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: Transferencia
  ) {
    // Se inicializa el FormGroup con valores vacíos o valores predeterminados
    this.transferForm = new FormGroup({
      from_account: new FormControl('', Validators.required),
      to_account: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]),
      currency: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  async ngOnInit(): Promise<void> {
    // Se cargan los datos de la transferencia en el formulario al inicializar el componente
    this.transferForm.patchValue({
      from_account: this.data.from_account,
      to_account: this.data.to_account,
      amount: this.data.amount,
      currency: this.data.currency,
      description: this.data.description
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
    if (this.transferForm.valid) {
      const formValue = this.transferForm.value;
      const updatedTransferData: Partial<Transferencia> = {
        from_account: formValue.from_account,
        to_account: formValue.to_account,
        amount: formValue.amount,
        currency: formValue.currency,
        description: formValue.description
      };

      try {
        // Verificar que el ID de la transferencia no sea undefined
        if (!this.data.id) {
          throw new Error('El ID de la transferencia es indefinido.');
        }

        // Actualizar la transferencia
        await this.supabaseService.updateTransfer(this.data.id, updatedTransferData);
        Swal.fire('Éxito', 'Transferencia actualizada correctamente', 'success');  // SweetAlert de éxito
        this.dialogRef.close(updatedTransferData);
      } catch (error) {
        console.error('Error al actualizar la transferencia', error);
        Swal.fire('Error', 'Error al actualizar la transferencia. Por favor, intente de nuevo.', 'error');  // SweetAlert de error
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
