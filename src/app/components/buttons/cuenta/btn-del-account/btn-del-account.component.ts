import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../modals/confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cuenta } from '../../../../models/cuenta.model';

@Component({
  selector: 'app-btn-del-account',
  templateUrl: './btn-del-account.component.html',
  styleUrls: ['./btn-del-account.component.css']
})
export class BtnDelAccountComponent {
  @Input() cuenta!: Cuenta;

  constructor(
    private dialog: MatDialog,
    private supabaseService: SupabaseService
  ) {}

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar la cuenta ${this.cuenta.account_number} asociada al cliente ${this.cuenta.clientName}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCuenta();
      }
    });
  }

  private deleteCuenta(): void {
    this.supabaseService.deleteCuenta(this.cuenta.id!)
      .then(() => {
        console.log('Cuenta eliminada');
      })
      .catch(error => {
        console.error('Error al eliminar cuenta', error);
      });
  }
}
