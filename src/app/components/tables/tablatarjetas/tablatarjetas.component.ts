import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Tarjeta } from '../../../models/tarjeta.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  constructor(private supabaseService: SupabaseService) { }

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

  async eliminarTarjeta(id: number) {
    try {
      const confirmar = confirm('¿Estás seguro de que deseas eliminar esta tarjeta?');
      if (confirmar) {
        await this.supabaseService.deleteTarjeta(id);
      }
    } catch (error) {
      console.error('Error al eliminar la tarjeta', error);
    }
  }
}
