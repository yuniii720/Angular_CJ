import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ServerResponse {
  success: boolean;
  message?: string;
  token?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  responseJSON: string = '';

  constructor(private router: Router) { }

  onSubmit() {

    const data: ServerResponse = {
      success: true,
      message: 'Login successful!',
      token: 'example_token'
    };

    console.log(data);
    this.responseJSON = JSON.stringify(data); 

    if (data.success) {
      if (data.token) {

      }
      this.router.navigate(['/main']);
    } else {
      if (data.message) {
        console.error(data.message);
      }
    }
  }
}
