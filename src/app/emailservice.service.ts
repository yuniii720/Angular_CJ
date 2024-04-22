import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailserviceService {

  constructor(private http: HttpClient) { }

  sendEmail(email: string, username: string, password: string) {
    const url = 'https://api.sendgrid.com/v3/mail/send'; 
    const apiKey = 'TU_API_KEY_DE_SENDGRID'; 
    const payload = {
      personalizations: [
        {
          to: [{ email: email }],
          subject: 'Bienvenido a nuestra aplicación'
        }
      ],
      from: { email: 'tu@email.com' }, 
      content: [
        {
          type: 'text/plain',
          value: `Hola ${username},\n\nBienvenido a nuestra aplicación. Aquí están tus credenciales:\n\nUsuario: ${username}\nContraseña: ${password}\n\n¡Gracias por registrarte!`
        }
      ]
    };

    return this.http.post(url, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`, 
        'Content-Type': 'application/json'
      }
    });
  }
}
