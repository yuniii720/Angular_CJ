import { Component, Inject, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Usuario } from '../../../../models/usuario.model';
import { AlertService } from '../../../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mod-user',
  templateUrl: './mod-user.component.html',
  styleUrls: ['./mod-user.component.css']
})
export class ModUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  subs: Subscription = new Subscription();

  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  constructor(
    public dialogRef: MatDialogRef<ModUserComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private alertService: AlertService
  ) {
    // Se inicializa el FormGroup con valores vacíos o valores predeterminados
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.minLength(6)]),  // La contraseña es opcional al editar
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('', Validators.required),
      hire_date: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // Se cargan los datos del usuario en el formulario al inicializar el componente
    this.userForm.patchValue({
      username: this.data.username,
      name: this.data.name,
      email: this.data.email,
      type: this.data.type,
      hire_date: this.data.hire_date ? new Date(this.data.hire_date) : undefined
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const updatedUserData: Partial<Usuario> = {
        username: formValue.username,
        name: formValue.name,
        email: formValue.email,
        type: formValue.type,
        hire_date: formValue.hire_date ? new Date(formValue.hire_date) : undefined
      };

      if (formValue.password) {
        updatedUserData.password = formValue.password;
      }

      try {
        // Verificar que el ID del usuario no sea undefined
        if (!this.data.id) {
          throw new Error('El ID del usuario es indefinido.');
        }

        // Actualizar el usuario
        await this.supabaseService.updateUsuario(this.data.id, updatedUserData);

        // Asignar rol según el tipo de usuario
        let roleId;
        switch (formValue.type.toLowerCase()) { // Convertir a minúsculas para comparación
          case 'superadmin':
            roleId = 1;
            break;
          case 'empleado':
            roleId = 2;
            break;
          case 'cliente':
            roleId = 3;
            break;
          default:
            throw new Error('Tipo de usuario desconocido');
        }

        // Actualizar en la tabla de roles
        await this.supabaseService.updateUserRole(this.data.id, roleId);

        this.alertService.success(`Usuario "${formValue.username}" actualizado.`);
        this.dialogRef.close();
      } catch (error) {
        console.error('Error al actualizar el usuario', error);
        this.alertService.error('Error al actualizar el usuario. Por favor, intente de nuevo.');
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onKeyPress(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      const inputs = this.inputs.toArray();
      const index = inputs.findIndex(input => input.nativeElement === event.target);
      if (index !== -1 && index < inputs.length - 1) {
        inputs[index + 1].nativeElement.focus();
      }
    }
  }
}
