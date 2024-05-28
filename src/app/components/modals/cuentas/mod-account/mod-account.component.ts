import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cuenta } from '../../../../models/cuenta.model';

@Component({
  selector: 'app-mod-account',
  templateUrl: './mod-account.component.html',
  styleUrls: ['./mod-account.component.css']
})
export class ModAccountComponent implements OnInit {
  accountForm: FormGroup;
  formattedBalance: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModAccountComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: Cuenta
  ) {
    this.accountForm = new FormGroup({
      id: new FormControl('', Validators.required),
      account_number: new FormControl('', Validators.required),
      clientName: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.accountForm.patchValue({
        account_number: this.data.account_number,
        id: this.data.id,
        clientName: this.data.clientName,
        balance: this.data.balance
      });

      // Inicializar el valor formateado
      this.formattedBalance = this.formatCurrency(this.data.balance);
    }

    // Subscribe to balance value changes to update formattedBalance
    this.accountForm.get('balance')?.valueChanges.subscribe(value => {
      this.formattedBalance = this.formatCurrency(value);
    });
  }

  formatCurrency(value: number): string {
    if (value !== null && value !== undefined) {
      return value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    }
    return '';
  }

  onSubmit(): void {
    if (!this.accountForm.valid) {
      console.error('Formulario no válido');
      return;
    }

    const updatedAccountData: Cuenta = {
      id: this.data.id,
      account_number: this.accountForm.get('account_number')?.value,
      client_id: this.data.client_id,
      created_at: this.data.created_at,
      balance: this.accountForm.get('balance')?.value // Asegúrate de incluir el saldo actualizado
    };

    this.supabaseService.updateCuenta(this.data.id!, updatedAccountData)
      .then(() => {
        console.log('Cuenta actualizada');
        this.dialogRef.close(true);
      })
      .catch(error => {
        console.error('Error al actualizar cuenta', error);
        this.dialogRef.close(false);
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
