import { AddMovimientoComponent } from '../../../modals/movimientos/add-movimiento/add-movimiento.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-btn-add-movimiento',
  templateUrl: './btn-add-movimiento.component.html',
  styleUrls: ['./btn-add-movimiento.component.css']
})
export class BtnAddMovimientoComponent {
  constructor(public dialog: MatDialog, private supabaseService: SupabaseService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMovimientoComponent, {
      width: '600px',
      data: { account_id: 1 }, // Pasa el ID de la cuenta seleccionada
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supabaseService.addMovimiento(result).then(response => {
          if (response.error) {
            console.error('Error adding movimiento:', response.error);
          } else {
            console.log('Movimiento added successfully:', response.data);
          }
        });
      }
    });
  }
}
