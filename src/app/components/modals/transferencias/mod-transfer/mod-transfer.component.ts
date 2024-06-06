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
      from_account: new FormControl({ value: '', disabled: true }, Validators.required),
      to_account: new FormControl({ value: '', disabled: true }, Validators.required),
      amount: new FormControl('', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]),
      description: new FormControl('')
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.cuentas = await this.supabaseService.getAllCuentas();

      // Buscar las cuentas correspondientes a los account_number
      const fromAccount = this.cuentas.find(account => account.account_number === this.data.from_account_id);
      const toAccount = this.cuentas.find(account => account.account_number === this.data.to_account_id);

      // Actualizar los valores del formulario
      this.transferForm.patchValue({
        from_account: fromAccount ? fromAccount.account_number : this.data.from_account,
        to_account: toAccount ? toAccount.account_number : this.data.to_account,
        amount: this.data.amount,
        currency: this.data.currency,
        description: this.data.description
      });
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
