import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Tarjeta } from '../../../models/tarjeta.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../modals/confirm-dialog/confirm-dialog.component'; 
@Component({
  selector: 'app-tabla-tarjetas',
  templateUrl: './tablatarjetas.component.html',
  styleUrls: ['./tablatarjetas.component.scss']
})
export class TablaTarjetasComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Tarjeta>();
  displayedColumns: string[] = ['cardHolderName', 'cardNumber', 'cardType', 'saldo', 'expirationDate', 'securityCode', 'accion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tarjetas: Tarjeta[] = [];
  private subs = new Subscription();

  selectedColumn: string = ''; // Añadido para solucionar el error de compilación

  constructor(private supabaseService: SupabaseService, private dialog: MatDialog) { } // Inyecta MatDialog

  ngOnInit(): void {
    this.subs.add(this.supabaseService.tarjeta$.subscribe(tarjetas => {
      this.tarjetas = tarjetas;
      this.dataSource.data = this.tarjetas;
    }));

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openConfirmDialog(id: number): void { // Método para abrir el ConfirmDialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirmar eliminación',
        message: '¿Estás seguro de que deseas eliminar esta tarjeta?'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarTarjeta(id);
      }
    });
  }

  async eliminarTarjeta(id: number) {
    try {
      await this.supabaseService.deleteTarjeta(id);
    } catch (error) {
      console.error('Error al eliminar la tarjeta', error);
    }
  }
}
