import { AddMovimientoComponent } from '../../../modals/movimientos/add-movimiento/add-movimiento.component'; // Asegúrate de tener este componente
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-btn-add-movimiento',
  templateUrl: './btn-add-movimiento.component.html',
  styleUrls: ['./btn-add-movimiento.component.css']
})
export class BtnAddMovimientoComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMovimientoComponent, {
      width: '600px', // Ajusta el ancho según tus necesidades
      data: { },       // Puedes pasar datos iniciales al diálogo si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // Aquí puedes manejar el resultado del diálogo, si es que devuelve algún valor
    });
  }
}
