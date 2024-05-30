import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

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
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
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
      console.log('Respuesta del inicio de sesión:', res);
      if (res.user) {
        this.alertService.success('Inicio de sesión exitoso');
      } else if (res.error) {
        this.alertService.error(`Error al iniciar sesión: ${res.error.message || res.error}`);
      } else {
        this.alertService.warning('Recuerda que la entrada a está página sin consentimiento se considera delito y está penado');
      }
    } catch (err: any) {
      console.error('Error durante el inicio de sesión:', err);
      if (err.message.includes("lock")) {
        this.errorMessage = 'Error de bloqueo durante el inicio de sesión. Por favor, inténtelo de nuevo.';
      } else {
        this.errorMessage = 'Error al iniciar sesión: ' + (err.message || err);
      }
      this.alertService.error(this.errorMessage);
    }
  }
}
