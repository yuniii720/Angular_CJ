import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      const url = 'http://localhost:5000/send-email'; // Reemplaza esta URL por la correcta
  
      // Configurar las opciones HTTP para enviar datos en formato JSON
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      // Realizar la solicitud HTTP POST con un observador
      this.http.post(url, formData, httpOptions).subscribe({
        next: (response) => {
          console.log('Correo electrónico enviado correctamente:', response);
        },
        error: (error) => {
          console.error('Error al enviar correo electrónico:', error);
        }
      });
    }
  }
}
