import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from '../../../services/supabase.service';
import { Tarjeta } from '../../../models/tarjeta.model';
import { UserRole } from '../../../models/user-role.model';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tablatarjetas',
  templateUrl: './tablatarjetas.component.html',
  styleUrls: ['./tablatarjetas.component.css']
})
export class TablaTarjetasComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource = new MatTableDataSource<Tarjeta>();
  displayedColumns: string[] = ['id', 'cardNumber', 'cardHolderName', 'cardType', 'expirationDate', 'securityCode', 'saldo', 'PIN', 'gestionar'];
  selectedColumn: string = 'cardNumber';
  filteredColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription = new Subscription();
  userRoleMessage$: Observable<string> = of('');

  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.filteredColumns = this.displayedColumns.filter(column => column !== 'gestionar');

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
        this.supabaseService.tarjetas$.subscribe((data: Tarjeta[]) => {
          this.dataSource.data = data;
        });
      } else if (role === 'Bienvenido cliente') {
        const userId = this.authService.getUserId();
        console.log('User ID from AuthService:', userId);
        if (userId) {
          this.supabaseService.getClientIdByUserId(userId).then(clientId => {
            if (clientId !== null) {
              this.supabaseService.getTarjetasByClientId(clientId).then(data => {
                this.dataSource.data = data;
              }).catch(error => {
                console.error('Error fetching cards for client', error);
              });
            } else {
              console.error('Error: clientId is null');
            }
          }).catch(error => {
            console.error('Error fetching client ID for user', error);
          });
        } else {
          console.error('Error: userId is undefined or null');
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
    console.log('Modificar tarjeta', tarjeta);
    if (tarjeta.id !== undefined) {
      this.supabaseService.updateTarjeta(tarjeta.id, tarjeta).then(response => {
        console.log('Tarjeta actualizada', response);
      }).catch(error => {
        console.error('Error al actualizar tarjeta', error);
      });
    } else {
      console.error('Error: id de la tarjeta es undefined');
    }
  }

  delTarjeta(tarjeta: Tarjeta): void {
    console.log('Eliminar tarjeta', tarjeta);
    if (tarjeta.id !== undefined) {
      this.supabaseService.deleteTarjeta(tarjeta.id).then(response => {
        this.alertService.success('Tarjeta eliminada con éxito.');
        this.dataSource.data = this.dataSource.data.filter(t => t.id !== tarjeta.id);
        console.log('Tarjeta eliminada', response);
      }).catch(error => {
        this.alertService.error('Error al eliminar la tarjeta.');
        console.error('Error al eliminar tarjeta', error);
      });
    } else {
      console.error('Error: id de la tarjeta es undefined');
    }
  }

  onTarjetaEliminada(tarjeta: Tarjeta): void {
    this.dataSource.data = this.dataSource.data.filter(t => t.id !== tarjeta.id);
  }
}
