import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient y HttpHeaders

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  registerUser() {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      const url = 'http://localhost:5000/send-email';
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      this.http.post(url, formData, httpOptions).subscribe({
        next: (response: any) => { // Define el tipo del parámetro response
          console.log('Correo electrónico enviado correctamente:', response);
        },
        error: (error: any) => { // Define el tipo del parámetro error
          console.error('Error al enviar correo electrónico:', error);
        }
      });
    }
  }
}
