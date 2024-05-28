import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModClientComponent } from '../../../modals/clientes/mod-client/mod-client.component';
import { Cliente } from '../../../../models/cliente.model';

@Component({
  selector: 'app-btn-mod-client',
  templateUrl: './btn-mod-client.component.html',
  styleUrls: ['./btn-mod-client.component.css']
})
export class BtnModClientComponent {
  @Input() cliente!: Cliente; // Añade el decorador Input aquí

  constructor(private dialog: MatDialog) {}

  openModClientDialog(): void {
    const dialogRef = this.dialog.open(ModClientComponent, {
      width: '600px',
      data: this.cliente // Pasa el cliente como data al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El cliente fue actualizado localmente');
      }
    });
  }
}
