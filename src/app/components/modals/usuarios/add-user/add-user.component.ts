import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    private supabaseService: SupabaseService,
    private alertService: AlertService
  ) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('', Validators.required),
      hire_date: new FormControl('', Validators.required)
    });
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      // Ajustar la fecha de alta a medianoche (00:00:00) en la zona horaria local
      let hireDate: Date | null = null;
      if (formValue.hire_date) {
        hireDate = new Date(formValue.hire_date);
        hireDate.setHours(0, 0, 0, 0);  // Establecer la hora a 00:00:00
      }

      const newUserData: Usuario = {
        ...formValue,
        hire_date: hireDate,
        created_at: new Date()  // Asigna la fecha actual
      };

      try {
        await this.supabaseService.addUsuario(newUserData);
        this.alertService.success('Usuario añadido');
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
