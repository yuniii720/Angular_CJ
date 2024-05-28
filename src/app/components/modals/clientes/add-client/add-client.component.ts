import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cliente } from '../../../../models/cliente.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  clientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    private supabaseService: SupabaseService
  ) {
    this.clientForm = new FormGroup({
      name: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birth_date: new FormControl('', Validators.required),
      city: new FormControl('')
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const clientData: Cliente = {
        ...this.clientForm.value,
        created_at: new Date().toISOString()
      };

      this.supabaseService.addLocalCliente(clientData);  // Guardar localmente
      console.log('Cliente añadido localmente');
      this.dialogRef.close(clientData); // Cerrar el diálogo e indicar éxito
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
