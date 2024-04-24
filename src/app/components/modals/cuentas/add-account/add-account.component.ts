import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cuenta } from '../../../../models/cuenta.model';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {
  accountForm: FormGroup = new FormGroup({
    clientName: new FormControl('', Validators.required),
    account_number: new FormControl('', Validators.required),
    client_id: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<AddAccountComponent>,
    private supabaseService: SupabaseService
  ) {}

  onSubmit(): void {
    if (this.accountForm.valid) {
      const accountData: Cuenta = {
        ...this.accountForm.value,
        created_at: new Date().toISOString()  // Asumiendo que quieres la fecha de creación al momento de guardar
      };

      this.supabaseService.addCuenta(accountData)
        .then(() => {
          console.log('Cuenta añadida con éxito');
          this.dialogRef.close();
        })
        .catch(error => {
          console.error('Error al añadir cuenta', error);
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
