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
      width: '600px',
      data: { /* datos que vamos a pasar al modal */ },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
