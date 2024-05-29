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
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['Cliente', Validators.required] 
    });
  }

  async registerUser() {
    if (this.registroForm.valid) {
      const { email, password, username, name, type } = this.registroForm.value;

      try {
        const user = await this.authService.signUp(email, password, username, name, type);
        console.log('Usuario registrado correctamente:', user);

        const roleId = 3;

        await this.authService.addUserRole(user.id, roleId);

        this.router.navigate(['/login']);
      } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        this.alertService.error(`Error al registrar usuario: ${error.message || error}`);
        this.errorMessage = error.message || 'Error al registrar usuario.';
      }
    }
  }
}
