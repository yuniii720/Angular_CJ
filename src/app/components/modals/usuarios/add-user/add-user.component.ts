import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Usuario } from '../../../../models/usuario.model';

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

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      const newUserData: Usuario = {
        ...this.userForm.value,
        created_at: new Date().toISOString()  // Asegúrate de que la fecha de creación se maneje aquí o en el servidor
      };
      try {
        // Agrega el usuario y espera la respuesta del servidor
        await this.supabaseService.addUsuario(newUserData);
        console.log('Usuario añadido exitosamente');
        this.dialogRef.close(); // Cierra el diálogo solo después de una adición exitosa
      } catch (error) {
        console.error('Error al añadir usuario', error);
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
