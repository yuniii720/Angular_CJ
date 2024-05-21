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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async registerUser() {
    if (this.registroForm.valid) {
      const { email,password } = this.registroForm.value;

      try {
        // Ajustar la llamada a signUp para pasar solo dos argumentos
        const user = await this.authService.signUp(email, password);
        console.log('Usuario registrado correctamente:', user);
        // Redirigir al usuario al login o a la página principal
        this.router.navigate([{ outlets: { auth: ['login'] } }]);
      } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        this.errorMessage = error.message || 'Error al registrar usuario.';
      }
    }
  }
}
