import { AddTransferComponent } from '../../../modals/transferencias/add-transfer/add-transfer.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';

@Component({
  selector: 'app-btn-add-transfer',
  templateUrl: './btn-add-transfer.component.html',
  styleUrls: ['./btn-add-transfer.component.css']
})
export class BtnAddTransferComponent {
  constructor(public dialog: MatDialog, private supabaseService: SupabaseService) { }

  openTransferDialog(): void {
    const dialogRef = this.dialog.open(AddTransferComponent, {
      width: '600px',
      data: { from_account: '', to_account: '', amount: 0, currency: '', description: '' }, // Pasa los datos iniciales
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.supabaseService.addTransfer(result).then(response => {
          if (response.error) {
            console.error('Error adding transfer:', response.error);
          } else {
            console.log('Transfer added successfully:', response.data);
          }
        });
      }
    });
  }
}
