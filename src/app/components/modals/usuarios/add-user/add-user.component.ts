import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { AuthService } from '../../../../services/auth.service';
import { Usuario } from '../../../../models/usuario.model';
import { Cliente } from '../../../../models/cliente.model';
import { AlertService } from '../../../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  passwordRequirements: { [key: string]: boolean } = {
    minLength: false,
    upperCase: false,
    lowerCase: false,
    specialChar: false,
    noSpaces: false
  };
  role_id: number | null = null;
  subs: Subscription = new Subscription();

  @ViewChildren('input') inputs!: QueryList<ElementRef>;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private supabaseService: SupabaseService,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    const today = new Date();
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator
      ]),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('', Validators.required),
      hire_date: new FormControl(today, Validators.required)
    });

    this.userForm.get('password')?.valueChanges.subscribe(value => {
      this.checkPasswordRequirements(value);
    });
  }

  ngOnInit(): void {
    // Suscribirse al observable del role_id
    this.subs.add(this.authService.getUserRole().subscribe(userRole => {
      if (userRole) {
        this.role_id = userRole.role_id;
        if (this.role_id === 2) { // Role 2 is for Empleado
          this.userForm.get('type')?.setValue('cliente');
          this.userForm.get('type')?.disable();
        }
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
        created_at: new Date(),
        type: this.role_id === 2 ? 'cliente' : formValue.type
      };

      try {
        // Insertar el usuario
        const addedUser = await this.supabaseService.addUsuario(newUserData);

        // Asignar rol según el tipo de usuario
        let roleId;
        switch (newUserData.type.toLowerCase()) {
          case 'Super Admin':
            roleId = 1;
            break;
          case 'Empleado':
            roleId = 2;
            break;
          case 'Cliente':
            roleId = 3;
            break;
          default:
            throw new Error('Tipo de usuario desconocido');
        }

        // Insertar en la tabla de roles
        await this.supabaseService.addUserRole(addedUser.id!, roleId);

        if (newUserData.type === 'Cliente') {
          // Insertar en la tabla de Clientes
          const newClienteData: Cliente = {
            user_id: addedUser.id!, // Usar el mismo ID del usuario para el cliente
            name: formValue.name,
            dni: '',
            email: formValue.email,
            birth_date: null,
            city: '',
            created_at: new Date()
          };

          await this.supabaseService.addCliente(newClienteData);
        }

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
