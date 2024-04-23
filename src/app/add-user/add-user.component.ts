import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddUserComponent>) {
    // Inicializa el formulario aquí
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl(''),
      created_at: new FormControl({ value: new Date().toISOString(), disabled: true }),
    });
  }

  onSubmit(): void {
    // Cierra el modal y pasa los datos del formulario al componente que lo abrió
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue());
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
