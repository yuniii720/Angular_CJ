import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../modals/confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cliente } from '../../../../models/cliente.model';

@Component({
  selector: 'app-btn-del-client',
  templateUrl: './btn-del-client.component.html',
  styleUrls: ['./btn-del-client.component.css']
})
export class BtnDelClientComponent {
  @Input() cliente!: Cliente;  // Asegúrate de pasar el objeto Cliente

  constructor(
    private dialog: MatDialog,
    private supabaseService: SupabaseService
  ) {}

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar al cliente ${this.cliente.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCliente();
      }
    });
  }

  private deleteCliente(): void {
    this.supabaseService.deleteCliente(this.cliente.id!)
      .then(() => {
        console.log('Cliente eliminado');
      })
      .catch(error => {
        console.error('Error al eliminar cliente', error);
      });
  }
}
