import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../supabase.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private supabaseService: SupabaseService
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl(''),
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const usuarioData: Usuario = {
        ...this.userForm.value,
        created_at: new Date().toISOString()
      };

      this.supabaseService.addUsuario(usuarioData)
        .then(data => {
          console.log('Usuario añadido', data);
          this.dialogRef.close();
        })
        .catch(error => {
          console.error('Error al añadir usuario', error);
        });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
