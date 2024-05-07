import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModAccountComponent } from '../../../modals/cuentas/mod-account/mod-account.component';
import { Cuenta } from '../../../../models/cuenta.model';

@Component({
  selector: 'app-btn-mod-account',
  templateUrl: './btn-mod-account.component.html',
  styleUrls: ['./btn-mod-account.component.css']
})
export class BtnModAccountComponent {
  @Input() cuenta!: Cuenta; 

  constructor(private dialog: MatDialog) {}

  openModAccountDialog(): void {
    const dialogRef = this.dialog.open(ModAccountComponent, {
      width: '600px',
      data: this.cuenta 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('La cuenta fue actualizada');

      }
    });
  }
}
