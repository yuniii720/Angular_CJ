import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Cuenta } from '../../../models/cuenta.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla-cuentas',
  templateUrl: './tablacuentas.component.html',
  styleUrls: ['./tablacuentas.component.css']
})
export class TablaCuentasComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource = new MatTableDataSource<Cuenta>();
  displayedColumns: string[] = ['id', 'account_number', 'clientName', 'balance', 'created_at', 'gestionar'];
  filteredColumns: string[] = [];
  selectedColumn: string = 'account_number';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription = new Subscription();

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.filteredColumns = this.displayedColumns.filter(column => column !== 'gestionar'); // Inicializar filteredColumns

    this.subs.add(this.supabaseService.cuentas$.subscribe(data => {
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

  createFilter(): (data: Cuenta, filter: string) => boolean {
    return (data: Cuenta, filter: string): boolean => {
      const textToSearch = data[this.selectedColumn as keyof Cuenta] && String(data[this.selectedColumn as keyof Cuenta]).toLowerCase() || '';
      if (this.selectedColumn === 'created_at') {
        // Date filtering logic can be added here if needed
        return false;
      } else {
        return textToSearch.indexOf(filter) !== -1;
      }
    };
  }

  modAccount(cuenta: Cuenta): void {
    // Lógica para modificar la cuenta
    console.log('Modificar cuenta', cuenta);
  }

  delAccount(cuenta: Cuenta): void {
    // Lógica para eliminar la cuenta
    console.log('Eliminar cuenta', cuenta);
  }
}
