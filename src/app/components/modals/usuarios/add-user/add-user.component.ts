import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Usuario } from '../../../../models/usuario.model';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  passwordRequirements: { [key: string]: boolean } = {
    minLength: false,
    upperCase: false,
    lowerCase: false,
    specialChar: false,
    noSpaces: false
  };

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private supabaseService: SupabaseService,
    private alertService: AlertService
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator
      ]),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('', Validators.required),
      hire_date: new FormControl('', Validators.required)
    });

    this.userForm.get('password')?.valueChanges.subscribe(value => {
      this.checkPasswordRequirements(value);
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const requirements = {
      minLength: value.length >= 8,
      upperCase: /[A-Z]/.test(value),
      lowerCase: /[a-z]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      noSpaces: !/\s/.test(value)
    };

    const valid = Object.values(requirements).every(Boolean);
    return valid ? null : { passwordInvalid: true };
  }

  checkPasswordRequirements(value: string) {
    this.passwordRequirements = {
      minLength: value.length >= 8,
      upperCase: /[A-Z]/.test(value),
      lowerCase: /[a-z]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      noSpaces: !/\s/.test(value)
    };
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      let hireDate: Date | null = null;
      if (formValue.hire_date) {
        hireDate = new Date(formValue.hire_date);
        hireDate.setHours(0, 0, 0, 0);
      }

      const newUserData: Usuario = {
        ...formValue,
        hire_date: hireDate,
        created_at: new Date()
      };

      try {
        // Insertar el usuario
        const addedUser = await this.supabaseService.addUsuario(newUserData);

        // Asignar rol según el tipo de usuario
        let roleId;
        switch (formValue.type) {
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

        // Insertar en la tabla de roles
        await this.supabaseService.addUserRole(addedUser.id, roleId);

        this.alertService.success(`Usuario "${formValue.username}" añadido.`);
        this.dialogRef.close();
      } catch (error) {
        console.error('Error al añadir usuario', error);
        this.alertService.error('Error al añadir usuario. Intente de nuevo.');
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
