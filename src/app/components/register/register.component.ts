import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PopupsComponent } from '../popups/popups.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registroForm: FormGroup;

  @ViewChild(PopupsComponent) popupsComponent!: PopupsComponent;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
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
        next: (response: any) => { 
          console.log('Correo electrónico enviado correctamente:', response);
          this.popupsComponent.mostrarPopup();
        },
        error: (error: any) => { 
          console.error('Error al enviar correo electrónico:', error);
        }
      });
    }
  }
}
