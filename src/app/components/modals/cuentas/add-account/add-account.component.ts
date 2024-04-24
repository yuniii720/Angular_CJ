import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cuenta } from '../../../../models/cuenta.model';
import { Cliente } from '../../../../models/cliente.model';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
    client_id: new FormControl('', Validators.required),
    account_number: new FormControl('', Validators.required),
    clientName: new FormControl({ value: '', disabled: true })
  });

  // Use the non-null assertion operator to assure TypeScript that the property will be initialized
  clientes$!: Observable<Cliente[]>;

  constructor(
    public dialogRef: MatDialogRef<AddAccountComponent>,
    private supabaseService: SupabaseService
  ) { }

  ngOnInit(): void {
    this.clientes$ = this.supabaseService.clientes$; // This is now assured to be initialized
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const accountData: Cuenta = {
        ...this.accountForm.value,
        created_at: new Date().toISOString()
      };

      this.supabaseService.addCuenta(accountData)
        .then(() => {
          console.log('Account added successfully');
          this.dialogRef.close();
        })
        .catch(error => {
          console.error('Error adding account', error);
        });
    }
  }

  onClientChange(event: any): void {
    const clientId = event.value;
    this.clientes$.pipe(
      map(clientes => clientes.find(cliente => cliente.id === clientId))
    ).subscribe(selectedClient => {
      this.accountForm.get('clientName')?.setValue(selectedClient?.name);
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
