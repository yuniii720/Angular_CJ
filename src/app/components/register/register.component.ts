import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

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
    private router: Router,
    private alertService: AlertService
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['Cliente', Validators.required]
    });
  }

  async registerUser() {
    if (this.registroForm.valid) {
      const { email, password, name, lastName, type } = this.registroForm.value;
      const baseUsername = `${name.charAt(0)}${lastName}`.toLowerCase();

      try {
        const username = await this.authService.checkAndGenerateUsername(baseUsername);
        const user = await this.authService.signUp(email, password, username, name, type);
        console.log('Usuario registrado correctamente:', user);

        // Mostrar alerta de éxito
        this.alertService.success('Usuario registrado correctamente.');

        // Redirigir al login
        this.router.navigate([{ outlets: { auth: ['login'] } }]);
      } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        this.alertService.error(`Error al registrar usuario: ${error.message || error}`);
        this.errorMessage = error.message || 'Error al registrar usuario.';
      }
    }
  }
}
