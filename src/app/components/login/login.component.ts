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
      email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.auth.signIn(email, password)
      .then((res: any) => {
        const userRole = res.data.user.role;
        console.log(userRole);
        if (userRole === 'authenticated') {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'User role is not authenticated.';
        }
      })
      .catch((err: any) => {
        console.error(err);
        this.errorMessage = 'Error occurred during sign in.';
      });
  }
}
