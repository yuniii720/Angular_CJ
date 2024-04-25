import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cliente } from '../../../../models/cliente.model';
import { Cuenta } from '../../../../models/cuenta.model';


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({
    client_id: new FormControl('', Validators.required)
  });

  clientes$!: Observable<Cliente[]>;

  constructor(
    public dialogRef: MatDialogRef<AddAccountComponent>,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.clientes$ = this.supabaseService.clientes$; // Load clients for the dropdown
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const accountNumber = this.supabaseService.generateAccountNumber(); // Use the service method
      const accountData: Cuenta = {
        account_number: accountNumber, // Generated account number
        client_id: this.accountForm.get('client_id')?.value,
        created_at: new Date().toISOString()
      };

      this.supabaseService.addCuenta(accountData)
        .then(() => {
          console.log('Account added successfully with number:', accountNumber);
          this.dialogRef.close(true);
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
