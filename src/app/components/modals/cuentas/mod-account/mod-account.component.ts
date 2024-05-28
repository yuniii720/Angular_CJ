import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cliente } from '../../../../models/cliente.model';
import { Cuenta } from '../../../../models/cuenta.model';

@Component({
  selector: 'app-mod-account',
  templateUrl: './mod-account.component.html',
  styleUrls: ['./mod-account.component.css']
})
export class ModAccountComponent implements OnInit {
  accountForm: FormGroup;
  formattedBalance: string = '';
  clientes$!: Observable<Cliente[]>;

  constructor(
    public dialogRef: MatDialogRef<ModAccountComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: Cuenta
  ) {
    this.accountForm = new FormGroup({
      id: new FormControl('', Validators.required),
      account_number: new FormControl('', Validators.required),
      client_id: new FormControl('', Validators.required),
      balance: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.accountForm.patchValue({
        id: this.data.id,
        account_number: this.data.account_number,
        client_id: this.data.client_id,
        balance: this.data.balance
      });

      // Inicializar el valor formateado
      this.formattedBalance = this.formatCurrency(this.data.balance);
    }

    // Cargar la lista de clientes
    this.clientes$ = this.supabaseService.clientes$;

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
      id: this.accountForm.get('id')?.value,
      account_number: this.accountForm.get('account_number')?.value,
      client_id: this.accountForm.get('client_id')?.value,
      created_at: this.data.created_at,
      balance: this.accountForm.get('balance')?.value // Asegúrate de incluir el saldo actualizado
    };

    this.supabaseService.updateLocalCuenta(this.data.id!, updatedAccountData);
    console.log('Cuenta actualizada localmente');
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
