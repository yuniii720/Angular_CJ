import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from '../../../services/supabase.service';
import { Cuenta } from '../../../models/cuenta.model';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../../services/auth.service';

interface UserRole {
  role_id: number;
}

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
  userRoleMessage$: Observable<string> = of(''); // Inicialización con un valor predeterminado

  constructor(private supabaseService: SupabaseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.filteredColumns = this.displayedColumns.filter(column => column !== 'gestionar'); // Inicializar filteredColumns

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

    this.subs.add(this.userRoleMessage$.subscribe(role => {
      if (role === 'Super Admin' || role === 'Bienvenido empleado') {
        this.supabaseService.cuentas$.subscribe((data: Cuenta[]) => {
          this.dataSource.data = data;
        });
      } else if (role === 'Bienvenido cliente') {
        const userId = this.authService.getUserId();
        if (userId) {
          this.supabaseService.getCuentasByUserId(userId).then(data => {
            this.dataSource.data = data;
          });
        }
      }
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
