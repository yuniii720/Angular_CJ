import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveAccountComponent } from '../../../modals/cuentas/save-account/save-account.component';

@Component({
  selector: 'app-btn-save-account',
  templateUrl: './btn-save-account.component.html',
  styleUrls: ['./btn-save-account.component.css']
})
export class BtnSaveAccountComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SaveAccountComponent, {
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
