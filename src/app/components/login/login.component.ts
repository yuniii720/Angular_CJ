// login.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// Definir una interfaz para la respuesta del servidor
interface ServerResponse {
  success: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient) { }

  onSubmit() {
    // Envía los datos del formulario al backend
    this.http.post<ServerResponse>('/login', {
      username: 'valor del campo de usuario',
      password: 'valor del campo de contraseña'
    }).pipe(
      tap(data => {
        // Maneja la respuesta del servidor
        console.log(data);
        // Si la autenticación fue exitosa, verifica el código de 2FA
        if (data.success) {
          this.verify2FA();
        }
      })
    ).subscribe();
  }

  verify2FA() {
    // Pide al usuario que ingrese el código de 2FA (puedes usar un modal, un input en la interfaz, etc.)
    const code = prompt("Introduce tu código de verificación en 2 pasos");
    
    // Envia el código al backend para su verificación
    this.http.post<ServerResponse>('/verify-2fa', { code }).pipe(
      tap(data => {
        // Maneja la respuesta del servidor
        console.log(data);
        if (data.success) {
          // Redirige al usuario a la siguiente página, ya que la autenticación ha sido exitosa
          // this.router.navigate(['/next-page']);
        } else {
          // Muestra un mensaje de error al usuario
          alert("El código de verificación en 2 pasos no es válido.");
        }
      })
    ).subscribe();
  }

}
