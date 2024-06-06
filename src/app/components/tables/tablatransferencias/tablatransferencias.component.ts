import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Transferencia } from '../../../models/transferencia.model';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tabla-transferencias',
  templateUrl: './tablatransferencias.component.html',
  styleUrls: ['./tablatransferencias.component.css']
})
export class TablaTransferenciasComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource = new MatTableDataSource<Transferencia>();
  displayedColumns: string[] = ['id', 'from_account', 'to_account', 'amount', 'description', 'status', 'date', 'actions'];
  filteredColumns: string[] = [];
  selectedColumn: string = 'from_account';
  role_id: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription = new Subscription();

  constructor(private supabaseService: SupabaseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.filteredColumns = this.displayedColumns.filter(column => column !== 'actions');
    this.supabaseService.loadTransferencias();

    this.subs.add(this.authService.getUserRole().subscribe(userRole => {
      if (userRole) {
        this.role_id = userRole.role_id;
      }
    }));

    this.subs.add(this.supabaseService.transferencias$.subscribe(data => {
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

  createFilter(): (data: Transferencia, filter: string) => boolean {
    return (data: Transferencia, filter: string): boolean => {
      const textToSearch = data[this.selectedColumn as keyof Transferencia] && String(data[this.selectedColumn as keyof Transferencia]).toLowerCase() || '';
      if (this.selectedColumn === 'date') {
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(data[this.selectedColumn as keyof Transferencia], 'dd/MM/yyyy');
        return formattedDate?.indexOf(filter) !== -1;
      } else {
        return textToSearch.indexOf(filter) !== -1;
      }
    };
  }

  modTransfer(transferencia: Transferencia): void {
    console.log('Modificar transferencia', transferencia);
  }

  delTransfer(transferencia: Transferencia): void {
    console.log('Eliminar transferencia', transferencia);
  }
}
