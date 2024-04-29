import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveUsersComponent } from '../../../modals/usuarios/save-users/save-users.component';

@Component({
  selector: 'app-btn-save-users',
  templateUrl: './btn-save-users.component.html',
  styleUrl: './btn-save-users.component.css'
})
export class BtnSaveUsersComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SaveUsersComponent, {
      width: '600px',
      data: { /* datos que vamos a pasar al modal */ },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
