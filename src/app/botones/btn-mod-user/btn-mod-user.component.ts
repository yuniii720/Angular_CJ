import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModUserComponent } from '../../modals/usuarios/mod-user/mod-user.component';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-btn-mod-user',
  templateUrl: './btn-mod-user.component.html',
  styleUrls: ['./btn-mod-user.component.css']
})
export class BtnModUserComponent {
  @Input() usuario!: Usuario; // Añade el decorador Input aquí

  constructor(private dialog: MatDialog) {}

  openModUserDialog(): void {
    const dialogRef = this.dialog.open(ModUserComponent, {
      width: '600px',
      data: this.usuario // Pasa el usuario como data al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El usuario fue actualizado');
        // Opcionalmente, recargar la lista de usuarios
      }
    });
  }
}
