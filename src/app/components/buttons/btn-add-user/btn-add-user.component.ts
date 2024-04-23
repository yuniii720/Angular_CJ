import { AddUserComponent } from '../../modals/usuarios/add-user/add-user.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-btn-add-user',
  templateUrl: './btn-add-user.component.html',
  styleUrl: './btn-add-user.component.css'
})
export class BtnAddUserComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
      data: { /* datos que vamos a pasar al modal */ },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
