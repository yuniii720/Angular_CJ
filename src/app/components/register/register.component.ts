import { Component } from '@angular/core';
import { EmailserviceService } from '../../services/emailservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private emailService: EmailserviceService) {}

  registerUser() {

    const email = 'correo@ejemplo.com';
    const username = 'usuario';
    const password = 'contraseña';

    this.emailService.sendEmail(email, username, password).subscribe(
      () => {
        console.log('Correo electrónico enviado correctamente');
      },
      (error : string) => {
        console.error('Error al enviar el correo electrónico:', error);
      }
    );
  }
}
