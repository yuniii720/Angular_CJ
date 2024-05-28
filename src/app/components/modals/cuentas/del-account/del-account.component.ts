import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cuenta } from '../../../../models/cuenta.model';

@Component({
  selector: 'app-del-account',
  templateUrl: './del-account.component.html',
  styleUrls: ['./del-account.component.css']
})
export class DelAccountComponent {
  @Input() cuenta!: Cuenta;

  constructor(
    public dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar la cuenta ${this.cuenta.account_number} asociada al cliente ${this.cuenta.clientName}?`
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCuenta();
      }
    });
  }

  deleteCuenta(): void {
    this.supabaseService.deleteCuenta(this.cuenta.id!)
      .then(() => {
        console.log('Cuenta eliminada localmente');
        // Aquí podrías emitir un evento o llamar a una función para actualizar la lista de usuarios en la tabla
      })
      .catch(error => {
        console.error('Error al eliminar cuenta', error);
      });
  }
}
