import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cliente } from '../../../../models/cliente.model';

@Component({
  selector: 'app-mod-client',
  templateUrl: './mod-client.component.html',
  styleUrls: ['./mod-client.component.css']
})
export class ModClientComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModClientComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {
    this.clientForm = new FormGroup({
      name: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      birth_date: new FormControl('', Validators.required),
      city: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.clientForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const updatedClientData: Cliente = {
        ...this.data,
        ...this.clientForm.value
      };

      this.supabaseService.updateCliente(this.data.id!, updatedClientData)
        .then(() => {
          console.log('Cliente actualizado');
          this.dialogRef.close(true);
        })
        .catch(error => {
          console.error('Error al actualizar cliente', error);
          this.dialogRef.close(false);
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}