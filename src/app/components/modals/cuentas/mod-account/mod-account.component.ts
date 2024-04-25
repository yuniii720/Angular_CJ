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

  constructor(
    public dialogRef: MatDialogRef<ModAccountComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: Cuenta
  ) {
    this.accountForm = new FormGroup({
      id: new FormControl('', Validators.required),
      account_number: new FormControl('', Validators.required),
      clientName: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.accountForm.patchValue({
        account_number: this.data.account_number,
        id: this.data.id,
        clientName: this.data.clientName
      });
    }
  }

  onSubmit(): void {
    if (!this.accountForm.valid) {
      console.error('Formulario no válido');
      return;
    }

    const updatedAccountData: Cuenta = {
      id: this.data.id,
      account_number: this.accountForm.get('account_number')?.value,
      client_id: this.data.client_id, // Asegúrate de incluir solo los campos que existen en la base de datos
      created_at: this.data.created_at
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
