import { AddAccountComponent } from '../../../modals/cuentas/add-account/add-account.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-btn-add-account',
  templateUrl: './btn-add-account.component.html',
  styleUrl: './btn-add-account.component.css'
})
export class BtnAddAccountComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAccountComponent, {
      width: '600px',
      data: { /* datos que vamos a pasar al modal */ },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
