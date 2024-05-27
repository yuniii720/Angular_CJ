import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Cliente } from '../../../models/cliente.model';
import { EventService } from '../../../services/event.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tablaclientes',
  templateUrl: './tablaclientes.component.html',
  styleUrls: ['./tablaclientes.component.css']
})
export class TablaClientesComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['id', 'name', 'dni', 'email', 'city', 'birth_date', 'created_at', 'gestionar'];
  selectedColumn: string = 'name';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription = new Subscription();
filteredColumns: any;

  constructor(private supabaseService: SupabaseService, private eventService: EventService) { }

  ngOnInit(): void {
    this.filteredColumns = this.displayedColumns.filter(column => column !== 'gestionar');
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
      const textToSearch = data[this.selectedColumn as keyof Cliente] && String(data[this.selectedColumn as keyof Cliente]).toLowerCase() || '';
      if (this.selectedColumn === 'birth_date' || this.selectedColumn === 'created_at') {
        return false;
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

  mostrarPopup() {
    alert('¡Confirmación recibida!');
  }
}
