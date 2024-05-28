import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { AddAccountComponent } from '../../../modals/cuentas/add-account/add-account.component';

@Component({
  selector: 'app-btn-add-account',
  templateUrl: './btn-add-account.component.html',
  styleUrls: ['./btn-add-account.component.css']
})
export class BtnAddAccountComponent {
  constructor(public dialog: MatDialog, private supabaseService: SupabaseService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAccountComponent, {
      width: '600px',
      data: { /* datos que vamos a pasar al modal */ },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  saveAccounts(): void {
    this.supabaseService.saveAllCuentas()
      .then(() => {
        console.log('Todas las cuentas se han guardado en la base de datos.');
      })
      .catch(error => {
        console.error('Error guardando las cuentas:', error);
      });
  }
}
