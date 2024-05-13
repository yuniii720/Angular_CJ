import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Usuario } from '../../../models/usuario.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tablausuarios.component.html',
  styleUrls: ['./tablausuarios.component.css']
})

export class TablaUsuariosComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Usuario>();
  displayedColumns: string[] = ['id', 'username', 'name', 'email', 'type', 'created_at', 'gestionar'];
  selectedColumn: string = 'username';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription = new Subscription();

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.subs.add(this.supabaseService.usuarios$.subscribe(data => {
      this.dataSource.data = data;
    }));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    console.log('Filtrando por:', filterValue); // Esto te ayudará a verificar que el método se está llamando
    this.dataSource.filterPredicate = (data, filter) => {
      const textToSearch = data[this.selectedColumn] && String(data[this.selectedColumn]).toLowerCase() || '';
      return textToSearch.indexOf(filter.toLowerCase()) !== -1;
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
