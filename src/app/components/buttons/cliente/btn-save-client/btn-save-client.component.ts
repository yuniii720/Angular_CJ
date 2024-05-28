import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveClientsComponent } from '../../../modals/clientes/save-clients/save-clients.component';

@Component({
  selector: 'app-btn-save-client',
  templateUrl: './btn-save-client.component.html',
  styleUrls: ['./btn-save-client.component.css']
})
export class BtnSaveClientComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(SaveClientsComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Cambios guardados exitosamente');
      } else {
        console.log('Guardado cancelado');
      }
    });
  }
}
