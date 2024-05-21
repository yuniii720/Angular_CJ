import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    try {
      const res = await this.auth.signIn(email, password);
      console.log('Respuesta del inicio de sesión:', res); // Mensaje de depuración
      if (res.user) {
        // Utiliza router.navigateByUrl() para navegar a una ruta que utiliza routerOutlet
        'Usuario correcto';
      } else if (res.error) {
        this.errorMessage = res.error.message || 'Fallo al autenticar usuario.';
      } else {
        this.errorMessage = 'Fallo al autenticar usuario.';
      }
    } catch (err: any) {
      console.error('Error durante el inicio de sesión:', err); // Mensaje de depuración
      if (err.message.includes("lock")) {
        this.errorMessage = 'Error de bloqueo durante el inicio de sesión. Por favor, inténtelo de nuevo.';
      } else {
        this.errorMessage = 'Ocurrió un error durante el inicio de sesión: ' + (err.message || err);
      }
    }
  }
}
