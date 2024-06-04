import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Movimiento } from '../../../models/movimiento.model';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tabla-movimientos',
  templateUrl: './tablamovimientos.component.html',
  styleUrls: ['./tablamovimientos.component.css']
})
export class TablaMovimientosComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource = new MatTableDataSource<Movimiento>();
  displayedColumns: string[] = ['id', 'account', 'type', 'amount', 'date', 'actions'];
  filteredColumns: string[] = [];
  selectedColumn: string = 'account';
  role_id: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription = new Subscription();

  constructor(private supabaseService: SupabaseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.filteredColumns = this.displayedColumns.filter(column => column !== 'actions');
    this.supabaseService.loadMovimientos();

    this.subs.add(this.authService.getUserRole().subscribe(userRole => {
      if (userRole) {
        this.role_id = userRole.role_id;
      }

      this.subs.add(this.supabaseService.movimientos$.subscribe(data => {
        this.dataSource.data = data;
      }));
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

  createFilter(): (data: Movimiento, filter: string) => boolean {
    return (data: Movimiento, filter: string): boolean => {
      const textToSearch = data[this.selectedColumn as keyof Movimiento] && String(data[this.selectedColumn as keyof Movimiento]).toLowerCase() || '';
      if (this.selectedColumn === 'date') {
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(data[this.selectedColumn as keyof Movimiento], 'dd/MM/yyyy');
        return formattedDate?.indexOf(filter) !== -1;
      } else {
        return textToSearch.indexOf(filter) !== -1;
      }
    };
  }

  modMovement(movimiento: Movimiento): void {
    console.log('Modificar movimiento', movimiento);
  }

  delMovement(movimiento: Movimiento): void {
    console.log('Eliminar movimiento', movimiento);
  }
}
