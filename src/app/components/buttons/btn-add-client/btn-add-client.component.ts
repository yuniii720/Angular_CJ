import { AddClientComponent } from '../../modals/clientes/add-client/add-client.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-btn-add-client',
  templateUrl: './btn-add-client.component.html',
  styleUrl: './btn-add-client.component.css'
})
export class BtnAddClientComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '600px',
      data: { /* datos que vamos a pasar al modal */ },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
