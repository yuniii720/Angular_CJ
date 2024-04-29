import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Usuario } from '../../../../models/usuario.model';

@Component({
  selector: 'app-mod-user',
  templateUrl: './mod-user.component.html',
  styleUrls: ['./mod-user.component.css']
})
export class ModUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModUserComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {
    // Se inicializa el FormGroup con valores vacíos o valores predeterminados
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.minLength(6)]),  // La contraseña es opcional al editar
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('')
    });
  }

  ngOnInit(): void {
    // Se cargan los datos del usuario en el formulario al inicializar el componente
    this.userForm.patchValue({
      username: this.data.username,
      name: this.data.name,
      email: this.data.email,
      type: this.data.type
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUserData: Usuario = {
        ...this.data,  // Los datos existentes del usuario
        ...this.userForm.value  // Los nuevos datos del formulario
      };
      this.supabaseService.updateUsuario(this.data.id!, updatedUserData);
      // Haz lo que necesites hacer después de actualizar el usuario aquí
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
