import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Cliente } from '../../../models/cliente.model';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tablaclientes.component.html',
  styleUrls: ['./tablaclientes.component.css']
})
export class TablaClientesComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['id', 'name', 'email', 'dni', 'birth_date', 'city', 'created_at', 'gestionar'];
  filteredColumns: string[] = [];
  selectedColumn: keyof Cliente = 'name';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription = new Subscription();

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.filteredColumns = this.displayedColumns.filter(column => column !== 'gestionar');
    this.supabaseService.loadClientes();

    this.subs.add(this.supabaseService.clientes$.subscribe(data => {
      this.dataSource.data = data;
    }));

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createFilter(): (data: Cliente, filter: string) => boolean {
    return (data: Cliente, filter: string): boolean => {
      const textToSearch = data[this.selectedColumn] && String(data[this.selectedColumn]).toLowerCase() || '';
      if (this.selectedColumn === 'birth_date' || this.selectedColumn === 'created_at') {
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(data[this.selectedColumn] as any, 'dd/MM/yyyy');
        return formattedDate?.indexOf(filter) !== -1;
      } else {
        return textToSearch.indexOf(filter) !== -1;
      }
    };
  }

  modCliente(cliente: Cliente): void {
    // Lógica para modificar el cliente
    console.log('Modificar cliente', cliente);
  }

  delCliente(cliente: Cliente): void {
    // Lógica para eliminar el cliente
    console.log('Eliminar cliente', cliente);
  }
}
