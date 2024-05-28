import { AddClientComponent } from '../../../modals/clientes/add-client/add-client.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-btn-add-client',
  templateUrl: './btn-add-client.component.html',
  styleUrls: ['./btn-add-client.component.css']
})
export class BtnAddClientComponent {
  constructor(public dialog: MatDialog, private supabaseService: SupabaseService) { }

  saveChanges(): void {
    this.supabaseService.saveAllClientes()
      .then(() => {
        console.log('Todos los clientes se han guardado en la base de datos');
      })
      .catch(error => {
        console.error('Error al guardar los clientes', error);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '600px',
      data: { /* datos que vamos a pasar al modal */ },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Cliente añadido localmente');
      } else {
        console.log('El diálogo fue cerrado sin añadir el cliente');
      }
    });
  }
}
