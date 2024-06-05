import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { Tarjeta } from '../models/tarjeta.model';
import { Usuario } from '../models/usuario.model';
import { Cliente } from '../models/cliente.model';
import { Cuenta } from '../models/cuenta.model';
import { Movimiento } from '../models/movimiento.model';
import { AuthService } from './auth.service';
import { AlertService } from './alert.service';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { Transferencia } from '../models/transferencia.model';


export interface SaveResult {
  success?: boolean;
  message?: string;
  error?: { message: string };
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  // Usuarios
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  public usuarios$ = this.usuariosSubject.asObservable();
  private localUsuarios: Usuario[] = [];
  private addedUsuarios: Usuario[] = [];
  private updatedUsuarios: Usuario[] = [];
  private deletedUsuarios: Usuario[] = [];

  // Clientes
  private localClientes: Cliente[] = [];
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();
  private updatedClientes: Cliente[] = [];
  private deletedClientes: Cliente[] = [];

  // Cuentas
  private cuentasSubject = new BehaviorSubject<Cuenta[]>([]);
  public cuentas$ = this.cuentasSubject.asObservable();
  private tarjetasSubject = new BehaviorSubject<Tarjeta[]>([]);

  private localCuentas: Cuenta[] = [];
  private addedCuentas: Cuenta[] = [];
  private updatedCuentas: Cuenta[] = [];
  private deletedCuentas: Cuenta[] = [];

  private movimientosSubject = new BehaviorSubject<Movimiento[]>([]);
  public movimientos$ = this.movimientosSubject.asObservable();

  balance: any;
  public tarjetas$ = this.tarjetasSubject.asObservable();

  // Transferencias
  private transferenciasSubject = new BehaviorSubject<Transferencia[]>([]);
  public transferencias$ = this.transferenciasSubject.asObservable();


  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.loadUsuarios();
    this.loadClientes();
    this.loadCuentas();
    this.loadTarjetas();
    this.loadMovimientos();
  }

  async enviarDatos(data: any): Promise<Observable<any>> {
    return this.http.post('https://pbjdatvfbfkhaqrxrzdg.supabase.co', data);
  }

  async fetchTarjetas() {
    const { data, error } = await this.supabase.from('Tarjetas').select('*');
    if (error) {
      console.error('Error fetching cards', error);
      throw error;
    }
    return data;
  }

  // Usuarios
  async loadUsuarios(filterType?: string) {
    let query = this.supabase.from('Usuarios').select('*').order('id', { ascending: true });

    if (filterType) {
      query = query.eq('type', filterType);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error loading users', error);
    } else {
      this.usuariosSubject.next(data);
    }
  }

  async getAllUsuarios() {
    const { data, error } = await this.supabase.from('Usuarios').select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async addUsuario(usuario: Usuario): Promise<Usuario> {
    try {
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email: usuario.email,
        password: usuario.password,
        options: { data: { username: usuario.username } }
      });

      if (authError) {
        throw authError;
      }

      const authUser = authData.user;
      if (!authUser) {
        throw new Error('No se pudo obtener el usuario autenticado.');
      }

      const userId = authUser.id;
      if (!userId) {
        throw new Error('El ID del usuario es undefined');
      }

      const { data: userInsertData, error: userInsertError } = await this.supabase.from('Usuarios').insert([{
        id: userId,
        email: usuario.email,
        username: usuario.username,
        name: usuario.name,
        password: usuario.password,
        type: usuario.type,
        hire_date: usuario.hire_date,
        created_at: usuario.created_at
      }]).select().single();

      if (userInsertError) {
        throw userInsertError;
      }

      const currentUsuarios = this.usuariosSubject.getValue();
      this.usuariosSubject.next([...currentUsuarios, userInsertData]);

      return userInsertData;
    } catch (error) {
      console.error('Error al añadir usuario', error);
      this.alertService.error('Error al añadir usuario. Intente de nuevo.');
      throw error;
    }
  }

  async addUserRole(userId: string, roleId: number): Promise<void> {
    try {
      const { data: existingRole, error: fetchError, status } = await this.supabase
        .from('userroles')
        .select('user_id, role_id')
        .eq('user_id', userId)
        .eq('role_id', roleId)
        .maybeSingle();

      if (fetchError && status !== 406) {
        throw fetchError;
      }

      if (existingRole) {
        console.log(`El rol ${roleId} ya está asignado al usuario ${userId}.`);
        return;
      }

      const { error: insertError } = await this.supabase.from('userroles').insert([{ user_id: userId, role_id: roleId }]);
      if (insertError) {
        console.error('Error inserting user role:', insertError);
        throw insertError;
      }
    } catch (error: unknown) {
      if (this.isSupabaseError(error)) {
        if (error.details === 'The result contains 0 rows') {
          console.log(`No existing role found for user_id ${userId} and role_id ${roleId}, proceeding with insert.`);
          const { error: insertError } = await this.supabase.from('userroles').insert([{ user_id: userId, role_id: roleId }]);
          if (insertError) {
            console.error('Error inserting user role:', insertError);
            throw insertError;
          }
        } else {
          console.error('Error adding user role:', error);
          throw error;
        }
      } else {
        console.error('Unexpected error adding user role:', error);
        throw error;
      }
    }
  }

  private isSupabaseError(error: unknown): error is { details?: string } {
    return typeof error === 'object' && error !== null && 'details' in error;
  }

  async updateUsuario(id: string, updatedFields: Partial<Usuario>): Promise<void> {
    const { data: updatedUserData, error } = await this.supabase.from('Usuarios').update(updatedFields).eq('id', id).select().single();
    if (error) {
      console.error('Error updating user', error);
      throw new Error('Error updating user');
    } else {
      const usuariosActuales = this.usuariosSubject.getValue();
      const updatedUsuarios = usuariosActuales.map(u => u.id === id ? { ...u, ...updatedUserData } : u);
      this.usuariosSubject.next(updatedUsuarios);

      if (updatedFields.type && updatedFields.type.toLowerCase() === 'cliente') {
        const { data: clienteData } = await this.supabase.from('Clientes').select('id').eq('user_id', id).single();
        if (clienteData) {
          const clienteId = clienteData.id;
          const clienteFields = {
            name: updatedFields.name,
            email: updatedFields.email,
          };
          await this.updateCliente(clienteId, clienteFields);
        }
      }
    }
  }

  async deleteClienteByUserId(userId: string): Promise<void> {
    const { error } = await this.supabase.from('Clientes').delete().eq('user_id', userId);
    if (error) {
      console.error('Error deleting client', error);
      throw error;
    }

    const clientesActuales = this.clientesSubject.getValue();
    const updatedClientes = clientesActuales.filter(c => c.user_id !== userId);
    this.clientesSubject.next(updatedClientes);
  }

  async deleteUsuario(id: string): Promise<void> {
    try {
      await this.deleteClienteByUserId(id);

      const { error } = await this.supabase.from('Usuarios').delete().match({ id });
      if (error) {
        console.error('Error deleting user from database', error);
        throw error;
      }

      const usuariosActuales = this.usuariosSubject.getValue();
      const updatedUsuarios = usuariosActuales.filter(u => u.id !== id);
      this.usuariosSubject.next(updatedUsuarios);

      const clientesActuales = this.clientesSubject.getValue();
      const updatedClientes = clientesActuales.filter(c => c.user_id !== id);
      this.clientesSubject.next(updatedClientes);

      this.alertService.success(`Usuario eliminado con éxito.`);
    } catch (error) {
      console.error('Error al eliminar usuario', error);
      this.alertService.error('Error al eliminar usuario. Intente de nuevo.');
      throw error;
    }
  }

  private adjustDateToLocalMidnight(date: Date): Date {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(0, 0, 0, 0);
    return new Date(adjustedDate.getTime() - adjustedDate.getTimezoneOffset() * 60000);
  }

  async syncUsuarios() {
    try {
      for (const usuario of this.addedUsuarios) {
        if (usuario.hire_date) {
          usuario.hire_date = this.adjustDateToLocalMidnight(new Date(usuario.hire_date));
        }
        await this.supabase.from('Usuarios').insert([usuario]);
      }
      for (const usuario of this.updatedUsuarios) {
        if (usuario.hire_date) {
          usuario.hire_date = this.adjustDateToLocalMidnight(new Date(usuario.hire_date));
        }
        await this.supabase.from('Usuarios').update(usuario).match({ id: usuario.id });
      }
      for (const usuario of this.deletedUsuarios) {
        const { error } = await this.supabase.from('Usuarios').delete().match({ id: usuario.id });
        if (error) {
          console.error('Error deleting user', error);
        }
      }

      this.addedUsuarios = [];
      this.updatedUsuarios = [];
      this.deletedUsuarios = [];

      await this.loadUsuarios();
    } catch (error) {
      console.error('Error al sincronizar los cambios', error);
    }
  }

  async getAllClientes(): Promise<Cliente[]> {
    const { data, error } = await this.supabase.from('Clientes').select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  addLocalCliente(cliente: Cliente) {
    this.localClientes.push(cliente);
    this.clientesSubject.next([...this.localClientes, ...this.clientesSubject.getValue()]);
    this.alertService.success('Cliente añadido localmente.');
  }

  async saveAllClientes() {
    try {
      for (const cliente of this.updatedClientes) {
        await this.updateCliente(cliente.id!, cliente);
      }
      this.updatedClientes = [];
      this.loadClientes();
      this.alertService.success('Todos los cambios se han guardado en la base de datos.');
    } catch (error) {
      console.error('Error al guardar los clientes', error);
      this.alertService.error('Error al guardar los clientes. Intente de nuevo.');
    }
  }

  async addCliente(cliente: Cliente): Promise<void> {
    try {
      const { data, error } = await this.supabase.from('Clientes').insert([cliente]).select().single();
      if (error) {
        console.error('Error adding client', error);
        throw error;
      } else {
        const currentClientes = this.clientesSubject.getValue();
        this.clientesSubject.next([...currentClientes, data]);
        this.alertService.success('Cliente añadido a la base de datos.');
      }
    } catch (error) {
      console.error('Error adding client', error);
      throw error;
    }
  }

  async loadClientes() {
    const { data, error } = await this.supabase.from('Clientes').select('*');
    if (error) {
      console.error('Error loading clients', error);
    } else {
      this.clientesSubject.next(data);
    }
  }

  updateLocalCliente(id: number, updatedFields: any) {
    const index = this.localClientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      this.localClientes[index] = { ...this.localClientes[index], ...updatedFields };
      this.updatedClientes.push(this.localClientes[index]);
      this.clientesSubject.next([...this.localClientes]);
    } else {
      const allClientes = this.clientesSubject.getValue();
      const clientIndex = allClientes.findIndex(cliente => cliente.id === id);
      if (clientIndex !== -1) {
        allClientes[clientIndex] = { ...allClientes[clientIndex], ...updatedFields };
        this.updatedClientes.push(allClientes[clientIndex]);
        this.clientesSubject.next([...allClientes]);
      }
    }
    this.alertService.success('Cliente modificado localmente.');
  }

  deleteLocalCliente(id: number) {
    const index = this.localClientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      this.deletedClientes.push(this.localClientes[index]);
      this.localClientes.splice(index, 1);
    } else {
      const allClientes = this.clientesSubject.getValue();
      const clientIndex = allClientes.findIndex(cliente => cliente.id === id);
      if (clientIndex !== -1) {
        this.deletedClientes.push(allClientes[clientIndex]);
        allClientes.splice(clientIndex, 1);
      }
    }
    this.clientesSubject.next([...this.localClientes, ...this.clientesSubject.getValue()]);
    this.alertService.success('Cliente eliminado localmente.');
  }

  async updateCliente(id: number, updatedFields: Partial<Cliente>): Promise<void> {
    const { data: updatedClienteData, error } = await this.supabase.from('Clientes').update(updatedFields).eq('id', id).select().single();
    if (error) {
      console.error('Error updating client', error);
      this.alertService.error('Error actualizando el cliente en la base de datos.');
      throw error;
    } else {
      const clientesActuales = this.clientesSubject.getValue();
      const updatedClientes = clientesActuales.map(c => c.id === id ? { ...c, ...updatedClienteData } : c);
      this.clientesSubject.next(updatedClientes);
      this.alertService.success('Cliente actualizado en la base de datos.');
    }
  }

  async deleteCliente(id: number) {
    const { data, error } = await this.supabase.from('Clientes').delete().match({ id });
    if (error) {
      console.error('Error deleting client', error);
    } else {
      this.loadClientes();
      this.alertService.success('Cliente eliminado de la base de datos.');
    }
  }

  // Cuentas
  async loadCuentas() {
    const { data, error } = await this.supabase
      .from('Cuentas')
      .select(`
        *,
        Cliente:Clientes (name)
      `);

    if (error) {
      console.error('Error loading accounts', error);
    } else {
      this.localCuentas = data.map(item => ({
        ...item,
        clientName: item.Cliente.name
      }));
      this.cuentasSubject.next(this.localCuentas);
    }
  }

  addLocalCuenta(cuenta: Cuenta): void {
    this.localCuentas.push(cuenta);
    this.cuentasSubject.next([...this.localCuentas]);
    this.alertService.success('Cuenta añadida localmente.');
  }

  async saveAllCuentas() {
    try {
      for (const cuenta of this.localCuentas) {
        if (!cuenta.id) {
          await this.addCuenta(cuenta);
        }
      }
      for (const cuenta of this.updatedCuentas) {
        const { clientName, ...cuentaSinNombre } = cuenta;
        await this.updateCuenta(cuenta.id!, cuentaSinNombre);
      }
      for (const cuenta of this.deletedCuentas) {
        await this.deleteCuentaFromDatabase(cuenta.id!);
      }
      this.localCuentas = [];
      this.updatedCuentas = [];
      this.deletedCuentas = [];
      await this.loadCuentas();
      this.alertService.success('Todos los cambios se han guardado en la base de datos.');
    } catch (error) {
      console.error('Error al guardar las cuentas', error);
      this.alertService.error('Error al guardar las cuentas. Intente de nuevo.');
    }
  }

  async deleteCuentaFromDatabase(id: number): Promise<void> {
    const { error } = await this.supabase.from('Cuentas').delete().eq('id', id);
    if (error) {
      console.error('Error deleting account', error);
      throw error;
    }
  }

  async syncCuentas(): Promise<void> {
    try {
      for (const cuenta of this.addedCuentas) {
        await this.supabase.from('Cuentas').insert([cuenta]);
      }
      for (const cuenta of this.updatedCuentas) {
        await this.supabase.from('Cuentas').update(cuenta).match({ id: cuenta.id });
      }
      for (const cuenta of this.deletedCuentas) {
        await this.supabase.from('Cuentas').delete().match({ id: cuenta.id });
      }

      this.addedCuentas = [];
      this.updatedCuentas = [];
      this.deletedCuentas = [];

      await this.loadCuentas();
    } catch (error) {
      console.error('Error al sincronizar los cambios de las cuentas', error);
    }
  }

  async addCuenta(cuenta: Cuenta): Promise<void> {
    try {
      const { clientName, ...cuentaSinNombre } = cuenta;

      const { data, error } = await this.supabase.from('Cuentas').insert([cuentaSinNombre]).select().single();
      if (error) {
        console.error('Error adding account', error);
        throw error;
      } else {
        const index = this.localCuentas.findIndex(c => c.account_number === cuenta.account_number);
        if (index !== -1) {
          this.localCuentas[index] = data;
        } else {
          this.localCuentas.push(data);
        }
        this.cuentasSubject.next([...this.localCuentas]);
        this.alertService.success('Cuenta añadida exitosamente.');
      }
    } catch (error) {
      console.error('Error adding account', error);
      throw error;
    }
  }

  updateLocalCuenta(id: number, updatedFields: any): void {
    console.log('Actualizando cuenta local:', id, updatedFields);
    const index = this.localCuentas.findIndex(c => c.id === id);
    if (index !== -1) {
      const updatedCuenta = { ...this.localCuentas[index], ...updatedFields };

      if (updatedFields.client_id) {
        const cliente = this.localClientes.find(cliente => cliente.id === updatedFields.client_id);
        if (cliente) {
          updatedCuenta.clientName = cliente.name;
        }
      }

      this.localCuentas[index] = updatedCuenta;
      this.updatedCuentas.push(updatedCuenta);
      this.cuentasSubject.next([...this.localCuentas]);
      this.alertService.success('Cuenta modificada localmente.');
      console.log('Cuenta después de modificar localmente:', this.localCuentas[index]);
    } else {
      throw new Error('Cuenta no encontrada');
    }
  }

  async updateCuenta(id: number, updatedFields: any): Promise<void> {
    try {
      const { clientName, Cliente, ...fieldsToUpdate } = updatedFields;
      const { data, error } = await this.supabase.from('Cuentas').update(fieldsToUpdate).eq('id', id);
      if (error) {
        console.error('Error updating account', error);
        throw new Error('Error updating account');
      }

      const index = this.localCuentas.findIndex(c => c.id === id);
      if (index !== -1) {
        this.localCuentas[index] = { ...this.localCuentas[index], ...fieldsToUpdate };

        if (updatedFields.client_id) {
          const cliente = await this.supabase.from('Clientes').select('name').eq('id', updatedFields.client_id).single();
          if (cliente.data) {
            this.localCuentas[index].clientName = cliente.data.name;
          }
        }
        this.cuentasSubject.next([...this.localCuentas]);
      }
    } catch (error) {
      console.error('Error updating account', error);
      throw error;
    }
  }

  async deleteCuenta(id: number): Promise<void> {
    const index = this.localCuentas.findIndex(c => c.id === id);
    if (index !== -1) {
      this.deletedCuentas.push(this.localCuentas[index]);
      this.localCuentas.splice(index, 1);
      this.cuentasSubject.next([...this.localCuentas]);
    } else {
      throw new Error('Cuenta no encontrada');
    }
  }

  generateAccountNumber(): string {
    const countryPrefix = 'ES';
    const controlDigits = Math.floor(10 + Math.random() * 90).toString();
    const bankCode = Math.floor(1000 + Math.random() * 9000).toString();
    const branchCode = Math.floor(1000 + Math.random() * 9000).toString();
    const checkDigits = Math.floor(10 + Math.random() * 90).toString();
    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    return `${countryPrefix}${controlDigits} ${bankCode} ${branchCode} ${checkDigits} ${accountNumber}`;
  }

  // Tarjetas
  async loadTarjetas() {
    const { data, error } = await this.supabase.from('Tarjetas').select('*');
    if (error) {
      console.error('Error loading cards', error);
    } else {
      this.tarjetasSubject.next(data);
    }
  }

  getSaldoTotal(): Observable<number> {
    const clientId = this.authService.getClientId();
    if (!clientId) {
      return new Observable(observer => observer.next(0));
    }

    return from(this.supabase
      .from('Cuentas')
      .select('balance')
      .eq('client_id', clientId)
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching saldo total:', response.error);
          return 0;
        }
        return response.data ? response.data.reduce((total: number, cuenta: any) => total + cuenta.balance, 0) : 0;
      })
    );
  }

  getCuentasActivas(): Observable<number> {
    const clientId = this.authService.getClientId();
    if (!clientId) {
      return new Observable(observer => observer.next(0));
    }

    return from(this.supabase
      .from('Cuentas')
      .select('*', { count: 'exact' })
      .eq('client_id', clientId)
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching cuentas activas:', response.error);
          return 0;
        }
        return response.count ? response.count : 0;
      })
    );
  }

  getTarjetasActivas(): Observable<number> {
    const clientId = this.authService.getClientId();
    if (!clientId) {
      return new Observable(observer => observer.next(0));
    }

    return from(this.supabase
      .from('Tarjetas')
      .select('*', { count: 'exact' })
      .eq('client_id', clientId)
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching tarjetas activas:', response.error);
          return 0;
        }
        return response.count ? response.count : 0;
      })
    );
  }

  getDeudaTotal(): Observable<number> {
    const clientId = this.authService.getClientId();
    if (!clientId) {
      return new Observable(observer => observer.next(0));
    }

    return from(this.supabase
      .from('Cuentas')
      .select('balance')
      .eq('client_id', clientId)
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching deuda total:', response.error);
          return 0;
        }
        return response.data ? response.data.reduce((total: number, cuenta: any) => total + cuenta.balance, 0) : 0;  // Assuming debt calculation is similar to balance
      })
    );
  }

  getOperacionesRecientes(): Observable<{ descripcion: string, monto: number }[]> {
    const clientId = this.authService.getClientId();
    if (!clientId) {
      return new Observable(observer => observer.next([]));
    }

    return from(this.supabase
      .from('Operaciones')  // Assuming there is an 'Operaciones' table
      .select('descripcion, monto')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
      .limit(5)
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching operaciones recientes:', response.error);
          return [];
        }
        return response.data ? response.data : [];
      })
    );
  }

  getTarjetas(): Observable<{ cardNumber: string, saldo: number }[]> {
    const clientId = this.authService.getClientId();
    if (!clientId) {
      return new Observable(observer => observer.next([]));
    }

    return from(this.supabase
      .from('Tarjetas')
      .select('cardNumber, saldo')
      .eq('client_id', clientId)
    ).pipe(
      map(response => {
        if (response.error) {
          console.error('Error fetching tarjetas:', response.error);
          return [];
        }
        return response.data ? response.data : [];
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getMovimientos(): Observable<{ transaction: string, category: string, amount: number, date: string, channel: string, status: string }[]> {
    const clientId = this.authService.getClientId();
    if (!clientId) {
      return of([]);
    }

    return from(this.supabase
      .from('Cuentas')
      .select('id')
      .eq('client_id', clientId)
    ).pipe(
      switchMap(cuentasResponse => {
        if (cuentasResponse.error) {
          console.error('Error fetching cuentas:', cuentasResponse.error);
          return of([]);
        }
        const cuentaIds = cuentasResponse.data.map((cuenta: any) => cuenta.id);

        return from(this.supabase
          .from('Movimientos')
          .select('transaction, category, amount, date, channel, status')
          .in('account_id', cuentaIds)
        ).pipe(
          map(movimientosResponse => {
            if (movimientosResponse.error) {
              console.error('Error fetching movimientos:', movimientosResponse.error);
              return [];
            }
            return movimientosResponse.data ? movimientosResponse.data : [];
          }),
          catchError(this.handleError('getMovimientos', []))
        );
      }),
      catchError(this.handleError('getCuentas', []))
    );
  }


  async addTarjeta(tarjeta: Tarjeta): Promise<void> {
    try {
      const { data, error } = await this.supabase.from('Tarjetas').insert([tarjeta]).select().single();
      if (error) {
        console.error('Error adding card', error);
      } else {
        const currentTarjetas = this.tarjetasSubject.getValue();
        this.tarjetasSubject.next([...currentTarjetas, data]);
      }
    } catch (error) {
      console.error('Error adding card', error);
      throw error;
    }
  }

  async updateTarjeta(tarjetaId: number, updatedFields: Partial<Tarjeta>): Promise<void> {
    const { data, error } = await this.supabase.from('Tarjetas').update(updatedFields).match({ id: tarjetaId });
    if (error) {
      console.error('Error updating card', error);
      throw new Error(error.message);
    } else {
      this.loadTarjetas();
    }
  }

  async deleteTarjeta(id: number): Promise<boolean> {
    try {
      const { error } = await this.supabase.from('Tarjetas').delete().match({ id });
      if (error) {
        console.error('Error deleting card', error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error deleting card', error);
      return false;
    }
  }

  async saveCreditCard(tarjeta: Omit<Tarjeta, 'id'>): Promise<SaveResult> {
    const { data, error } = await this.supabase.from('Tarjetas').insert([tarjeta]).select().single();
    if (error) {
      return { error };
    }
    const currentTarjetas = this.tarjetasSubject.getValue();
    this.tarjetasSubject.next([...currentTarjetas, data]);
    return { success: true, message: 'Tarjeta guardada correctamente' };
  }

  async getAllCuentas(): Promise<Cuenta[]> {
    const { data, error } = await this.supabase.from('Cuentas').select('*');
    if (error) {
      console.error('Error fetching accounts', error);
      throw error;
    }
    return data;
  }

  async loadTarjetasConCuentas() {
    const { data, error } = await this.supabase
      .from('Tarjetas')
      .select(`
        *,
        Cuentas (
          account_number
        )
      `);

    if (error) {
      console.error('Error loading cards with account numbers', error);
    } else {
      this.tarjetasSubject.next(data.map(t => ({
        ...t,
        account_number: t.Cuentas ? t.Cuentas.account_number : null
      })));
    }
  }

  async getClientIdByUserId(userId: string): Promise<number | null> {
    const { data, error } = await this.supabase
      .from('Clientes')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching client ID for user', error);
      return null;
    }
    return data ? data.id : null;
  }

  async getTarjetasByClientId(clientId: number): Promise<Tarjeta[]> {
    const { data, error } = await this.supabase
      .from('Tarjetas')
      .select('*')
      .eq('client_id', clientId);

    if (error) {
      console.error('Error fetching cards for client', error);
      throw error;
    }
    return data;
  }

  async getTarjetasByUserId(userId: string): Promise<Tarjeta[]> {
    const clientId = await this.getClientIdByUserId(userId);
    if (clientId === null) {
      throw new Error('Client ID not found for given user ID');
    }
    return this.getTarjetasByClientId(clientId);
  }

  async getCuentasByUserId(userId: string): Promise<Cuenta[]> {
    const clientId = await this.getClientIdByUserId(userId);
    if (clientId === null) {
      throw new Error('Client ID not found for given user ID');
    }
    const { data, error } = await this.supabase
      .from('Cuentas')
      .select('*')
      .eq('client_id', clientId);

    if (error) {
      console.error('Error fetching accounts for user', error);
      throw error;
    }
    return data;
  }

  async updateUserRole(userId: string, roleId: number): Promise<void> {
    const { error } = await this.supabase
      .from('userroles')
      .update({ role_id: roleId })
      .eq('user_id', userId);
    if (error) {
      throw error;
    }
  }

  async enviarBizum(datos: any): Promise<SaveResult> {
    try {
      const { cuentaOrigen, importe, destinatario, motivo } = datos;

      // Verificar saldo suficiente en la cuenta de origen
      const { data: cuentaData, error: cuentaError } = await this.supabase
        .from('Cuentas')
        .select('balance')
        .eq('id', cuentaOrigen)
        .single();

      if (cuentaError || !cuentaData || cuentaData.balance < importe) {
        return { success: false, message: 'Saldo insuficiente o cuenta no encontrada' };
      }

      // Actualizar el saldo de la cuenta de origen
      const { error: updateError } = await this.supabase
        .from('Cuentas')
        .update({ balance: cuentaData.balance - importe })
        .eq('id', cuentaOrigen);

      if (updateError) {
        return { success: false, message: 'Error al actualizar el saldo' };
      }

      // Aquí podrías añadir lógica para enviar el Bizum al destinatario
      // Por ejemplo, registrando la transacción en una tabla de movimientos

      return { success: true, message: 'Bizum enviado correctamente' };
    } catch (error) {
      console.error('Error al enviar Bizum', error);
      return { success: false, message: 'Error al enviar Bizum' };
    }
  }

  async obtenerCuentas(): Promise<Cuenta[]> {
    const { data, error } = await this.supabase.from('Cuentas').select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  // Movimientos
  async loadMovimientos() {
    const { data, error } = await this.supabase
      .from('Movimientos')
      .select(`
        *,
        account:Cuentas(account_number)
      `)
      .order('id', { ascending: true });

    if (error) {
      console.error('Error loading movements', error);
    } else {
      this.movimientosSubject.next(data);
    }
  }

  async addMovimiento(movimiento: Movimiento): Promise<{ data: Movimiento | null, error: any }> {
    const { data, error } = await this.supabase.from('Movimientos').insert([movimiento]).select(`
      *,
      account:Cuentas(account_number)
    `).single();

    if (error) {
      console.error('Error adding movimiento', error);
    } else {
      const currentMovimientos = this.movimientosSubject.getValue();
      this.movimientosSubject.next([...currentMovimientos, data as Movimiento]);

      if (data) {
        // Cambiar el estado a 'Success' después de 30 segundos
        setTimeout(async () => {
          try {
            await this.updateMovimientoStatus(data.id, 'Success');
            const updatedMovimientos = this.movimientosSubject.getValue().map(movimiento =>
              movimiento.id === data.id ? { ...movimiento, status: 'Success' } : movimiento
            ) as Movimiento[];
            this.movimientosSubject.next(updatedMovimientos);

            // Mostrar el snackbar
            this.snackBar.open('Movimiento confirmado correctamente', 'Cerrar', {
              duration: 3000,
            });
          } catch (updateError) {
            console.error('Error al actualizar el estado del movimiento', updateError);
          }
        }, 30000);
      }
    }
    return { data, error };
  }

  async updateMovimiento(id: number, updatedFields: Partial<Movimiento>): Promise<void> {
    const { data, error } = await this.supabase.from('Movimientos').update(updatedFields).eq('id', id).select().single();
    if (error) {
      console.error('Error updating movimiento', error);
      this.alertService.error('Error', 'Error al actualizar el movimiento');  // SweetAlert de error
      throw new Error('Error updating movimiento');
    } else {
      const movimientosActuales = this.movimientosSubject.getValue();
      const updatedMovimientos = movimientosActuales.map(movimiento =>
        movimiento.id === id ? { ...movimiento, ...updatedFields } : movimiento
      );
      this.movimientosSubject.next(updatedMovimientos);
      this.alertService.success('Éxito', 'Movimiento actualizado correctamente');  // SweetAlert de éxito
    }
  }

  async deleteMovimiento(movimientoId: number): Promise<void> {
    const { data, error } = await this.supabase.from('Movimientos').delete().match({ id: movimientoId }).select().single();
    if (error) {
      console.error('Error deleting movimiento', error);
      throw error;
    }

    // Actualizar la lista de movimientos en el BehaviorSubject
    const currentMovimientos = this.movimientosSubject.getValue();
    const updatedMovimientos = currentMovimientos.filter(movimiento => movimiento.id !== movimientoId);
    this.movimientosSubject.next(updatedMovimientos);
  }

  async updateMovimientoStatus(id: number, status: 'Processing' | 'Success'): Promise<void> {
    const { error } = await this.supabase
      .from('Movimientos')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating movimiento status', error);
      throw error;
    } else {
      const currentMovimientos = this.movimientosSubject.getValue();
      const updatedMovimientos = currentMovimientos.map(movimiento =>
        movimiento.id === id ? { ...movimiento, status } : movimiento
      );
      this.movimientosSubject.next(updatedMovimientos);
    }
  }

  // Transferencias
async addTransfer(transferencia: Transferencia): Promise<any> {
    try {
      // Buscar los account_number de las cuentas basadas en los id proporcionados
      const { data: fromAccount, error: fromAccountError } = await this.supabase
        .from('Cuentas')
        .select('account_number')
        .eq('id', transferencia.from_account_id)
        .single();

      if (fromAccountError) throw new Error(`La cuenta de origen con id ${transferencia.from_account_id} no existe.`);

      const { data: toAccount, error: toAccountError } = await this.supabase
        .from('Cuentas')
        .select('account_number')
        .eq('id', transferencia.to_account_id)
        .single();

      if (toAccountError) throw new Error(`La cuenta de destino con id ${transferencia.to_account_id} no existe.`);

      // Insertar la transferencia usando los account_number de las cuentas encontradas
      const transferData = {
        from_account_id: fromAccount.account_number,
        to_account_id: toAccount.account_number,
        amount: transferencia.amount,
        currency: transferencia.currency,
        description: transferencia.description,
        transfer_date: new Date().toISOString(),
        status: 'pendiente'
      };

      const { data, error } = await this.supabase
        .from('Transferencias')
        .insert([transferData])
        .select(`*, from_account:from_account_id(account_number), to_account:to_account_id(account_number)`);

      if (error) throw error;

      // Actualizar el BehaviorSubject
      const currentTransferencias = this.transferenciasSubject.getValue();
      this.transferenciasSubject.next([...currentTransferencias, ...data]);

      return { data };
    } catch (error) {
      console.error('Error adding transfer', error);
      throw error;
    }
  }

  async loadTransferencias() {
    const { data, error } = await this.supabase
      .from('Transferencias')
      .select(`
      *,
      from_account:from_account_id(account_number),
      to_account:to_account_id(account_number)
    `)
      .order('id', { ascending: true });

    if (error) {
      console.error('Error loading transfers', error);
    } else {
      this.transferenciasSubject.next(data);
    }
  }

  async updateTransfer(id: number, updatedFields: Partial<Transferencia>): Promise<void> {
    const { data, error } = await this.supabase.from('Transferencias').update(updatedFields).eq('id', id).select().single();
    if (error) {
      console.error('Error updating transfer', error);
      throw new Error('Error updating transfer');
    } else {
      const transferenciasActuales = this.transferenciasSubject.getValue();
      const updatedTransferencias = transferenciasActuales.map(transferencia =>
        transferencia.id === id ? { ...transferencia, ...updatedFields } : transferencia
      );
      this.transferenciasSubject.next(updatedTransferencias);
    }
  }

  async deleteTransfer(transferId: number): Promise<void> {
    const { data, error } = await this.supabase
      .from('Transferencias')
      .delete()
      .match({ id: transferId })
      .select()
      .single();

    if (error) {
      console.error('Error deleting transfer', error);
      throw error;
    }

    const currentTransfers = this.transferenciasSubject.getValue();
    const updatedTransfers = currentTransfers.filter(transfer => transfer.id !== transferId);
    this.transferenciasSubject.next(updatedTransfers);
  }
}
