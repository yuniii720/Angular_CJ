import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private supabaseService: SupabaseService,
    private snackBar: MatSnackBar
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
      const newUserData: Usuario = this.userForm.value;
      try {
        await this.supabaseService.addUsuario(newUserData);
        this.snackBar.open('Usuario añadido exitosamente', 'Cerrar', {
          duration: 3000  // Duración en milisegundos
        });
        this.dialogRef.close(); // Cierra el diálogo
      } catch (error) {
        console.error('Error al añadir usuario', error);
        this.snackBar.open('Error al añadir usuario', 'Cerrar', {
          duration: 3000
        });
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
