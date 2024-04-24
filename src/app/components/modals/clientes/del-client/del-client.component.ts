import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../confirm-dialog/confirm-dialog.component';
import { SupabaseService } from '../../../../services/supabase.service';
import { Cliente } from '../../../../models/cliente.model';

@Component({
  selector: 'app-del-client',
  templateUrl: './del-client.component.html',
  styleUrl: './del-client.component.css'
})
export class DelClientComponent {
  @Input() cliente!: Cliente;
  deleteCliente: any;

  constructor(
    public dialog: MatDialog,
    private supabaseService: SupabaseService
  ) { }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de querer eliminar a ${this.cliente.name}?`
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCliente();
      }
    });
  }

  deleteUsuario(): void {
    this.supabaseService.deleteCliente(this.cliente.id!)
      .then(() => {
        console.log('Cliente eliminado');
        // Aquí podrías emitir un evento o llamar a una función para actualizar la lista de usuarios en la tabla
      })
      .catch(error => {
        console.error('Error al eliminar cliente', error);
      });
  }
}
