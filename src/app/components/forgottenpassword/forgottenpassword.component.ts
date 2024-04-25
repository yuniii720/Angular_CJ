import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-forgottenpassword',
  templateUrl: './forgottenpassword.component.html',
  styleUrls: ['./forgottenpassword.component.css']
})
export class ForgottenpasswordComponent {
  recoveryForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendRecoveryEmail() {
    if (this.recoveryForm.valid) {
      const formData = this.recoveryForm.value;
      const url = 'http://localhost:5000/forgot-password';

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.post(url, formData, httpOptions).subscribe({
        next: (response: any) => {
          console.log('Correo electrónico de recuperación enviado correctamente:', response);
          // Puedes mostrar un mensaje de éxito al usuario si lo deseas
        },
        error: (error: any) => {
          console.error('Error al enviar correo electrónico de recuperación:', error);
          // Puedes mostrar un mensaje de error al usuario si lo deseas
        }
      });
    }
  }
}
