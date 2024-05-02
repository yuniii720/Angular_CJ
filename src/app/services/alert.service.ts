import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public success(message: string, title: string = "") {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  public error(message: string, title: string = "Error") {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }

  public warning(message: string, title: string = "Advertencia") {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Entendido'
    });
  }

  public info(message: string, title: string = "Información") {
    Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }

  public confirm(message: string, title: string = "Confirmación"): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'No, cancelar'
    }).then(result => {
      return result.isConfirmed;
    });
  }
}
