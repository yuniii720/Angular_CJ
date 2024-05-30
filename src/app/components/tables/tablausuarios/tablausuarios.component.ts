import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Usuario } from '../../../models/usuario.model';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tablausuarios.component.html',
  styleUrls: ['./tablausuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource = new MatTableDataSource<Usuario>();
  displayedColumns: string[] = ['id', 'username', 'name', 'email', 'type', 'hire_date', 'created_at', 'gestionar'];
  filteredColumns: string[] = [];
  selectedColumn: string = 'username';
  userRoleMessage: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription = new Subscription();

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
  this.filteredColumns = this.displayedColumns.filter(column => column !== 'gestionar');
  if (this.userRoleMessage === 'Bienvenido empleado') {
    this.supabaseService.loadUsuarios('Cliente');
  } else {
    this.supabaseService.loadUsuarios();
  }
  this.subs.add(this.supabaseService.usuarios$.subscribe(data => {
    // Filtrar los datos para que solo se muestren los usuarios cuyo tipo es "Empleado"
    this.dataSource.data = data.filter(usuario => usuario.type === 'Cliente');
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

  createFilter(): (data: Usuario, filter: string) => boolean {
    return (data: Usuario, filter: string): boolean => {
      const textToSearch = data[this.selectedColumn] && String(data[this.selectedColumn]).toLowerCase() || '';
      if (this.selectedColumn === 'hire_date' || this.selectedColumn === 'created_at') {
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(data[this.selectedColumn], 'dd/MM/yyyy');
        return formattedDate?.indexOf(filter) !== -1;
      } else {
        return textToSearch.indexOf(filter) !== -1;
      }
    };
  }

  modUser(usuario: Usuario): void {
    // Lógica para modificar el usuario
    console.log('Modificar usuario', usuario);
  }

  delUser(usuario: Usuario): void {
    // Lógica para eliminar el usuario
    console.log('Eliminar usuario', usuario);
  }
}
