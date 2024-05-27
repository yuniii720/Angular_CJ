import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registroForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['', Validators.required] // Nuevo campo para el tipo de usuario
    });
  }

  async registerUser() {
    if (this.registroForm.valid) {
      const { email, password, username, name, type } = this.registroForm.value;

      try {
        const user = await this.authService.signUp(email, password, username, name, type);
        console.log('Usuario registrado correctamente:', user);

        this.router.navigate([{ outlets: { auth: ['login'] } }]);
      } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        this.errorMessage = error.message || 'Error al registrar usuario.';
      }
    }
  }
}
