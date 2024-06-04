import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { BizumCardComponent } from '../../../modals/tarjetas/bizum-card/bizum-card.component';

@Component({
  selector: 'app-btn-bizum-tarjeta',
  templateUrl: './btn-bizum-tarjeta.component.html',
  styleUrl: './btn-bizum-tarjeta.component.css'
})
export class BtnBizumTarjetaComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(BizumCardComponent, {
      width: '600px',
      data: { },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
