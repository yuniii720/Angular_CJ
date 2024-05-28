// tablatarjetas.component.ts
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from '../../../services/supabase.service';
import { Tarjeta } from '../../../models/tarjeta.model';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../../services/auth.service';

interface UserRole {
  role_id: number;
}

@Component({
  selector: 'app-tablatarjetas',
  templateUrl: './tablatarjetas.component.html',
  styleUrls: ['./tablatarjetas.component.css']
})
export class TablaTarjetasComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource = new MatTableDataSource<Tarjeta>();
  displayedColumns: string[] = ['id', 'cardNumber', 'cardHolderName', 'cardType', 'expirationDate', 'securityCode', 'account_id', 'saldo', 'PIN', 'gestionar'];
  selectedColumn: string = 'cardNumber';
  filteredColumns: string[] = []; // Asignación inicial

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription = new Subscription();
  userRoleMessage$: Observable<string> = of(''); // Inicialización con un valor predeterminado

  constructor(private supabaseService: SupabaseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.filteredColumns = this.displayedColumns.filter(column => column !== 'gestionar');
    this.subs.add(this.supabaseService.tarjetas$.subscribe(data => {
      this.dataSource.data = data;
    }));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();

    // Configurar userRoleMessage$
    this.userRoleMessage$ = this.authService.getUserRole().pipe(
      map((userRole: UserRole | null) => {
        if (!userRole) {
          return '';
        }

        const role_id = userRole.role_id;
        if (role_id === 1) {
          return 'Super Admin';
        } else if (role_id === 2) {
          return 'Bienvenido empleado';
        } else if (role_id === 3) {
          return 'Bienvenido cliente';
        } else {
          return '';
        }
      })
    );
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

  createFilter(): (data: Tarjeta, filter: string) => boolean {
    return (data: Tarjeta, filter: string): boolean => {
      const textToSearch = data[this.selectedColumn as keyof Tarjeta] && String(data[this.selectedColumn as keyof Tarjeta]).toLowerCase() || '';
      if (this.selectedColumn === 'expirationDate') {
        return false;
      } else {
        return textToSearch.indexOf(filter) !== -1;
      }
    };
  }

  modTarjeta(tarjeta: Tarjeta): void {
    // Lógica para modificar la tarjeta
    console.log('Modificar tarjeta', tarjeta);
  }

  delTarjeta(tarjeta: Tarjeta): void {
    // Lógica para eliminar la tarjeta
    console.log('Eliminar tarjeta', tarjeta);
  }
}
