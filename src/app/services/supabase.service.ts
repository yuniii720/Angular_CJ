import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { Usuario } from '../models/usuario.model';
import { Cliente } from '../models/cliente.model';
import { Cuenta } from '../models/cuenta.model';
import { Tarjeta } from '../models/tarjeta.model';
import { AlertService } from './alert.service';
 
export interface SaveResult {
  error?: { message: string };
}
 
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  public usuarios$ = this.usuariosSubject.asObservable();
  private localUsuarios: Usuario[] = [];
  private addedUsuarios: Usuario[] = [];
  private updatedUsuarios: Usuario[] = [];
  private deletedUsuarios: Usuario[] = [];
 
  private localClientes: Cliente[] = [];
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();
  private updatedClientes: Cliente[] = []; // Lista para los clientes modificados
  private deletedClientes: Cliente[] = []; // Lista para los clientes eliminados
 
  private cuentasSubject = new BehaviorSubject<Cuenta[]>([]);
  public cuentas$ = this.cuentasSubject.asObservable();
  private tarjetasSubject = new BehaviorSubject<Tarjeta[]>([]);
 
  private localCuentas: Cuenta[] = [];
  private addedCuentas: Cuenta[] = [];
  private updatedCuentas: Cuenta[] = [];
  private deletedCuentas: Cuenta[] = [];
 
  balance: any;
  public tarjetas$ = this.tarjetasSubject.asObservable();
 
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.loadUsuarios();
    this.loadClientes();
    this.loadCuentas();
    this.loadTarjetas();
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
  async loadUsuarios() {
    const { data, error } = await this.supabase.from('Usuarios').select('*').order('id', { ascending: true });
    if (error) {
      console.error('Error loading users', error);
    } else {
      this.usuariosSubject.next(data);
      this.localUsuarios = [...data];
    }
  }
 
  async getAllUsuarios() {
    const { data, error } = await this.supabase.from('Usuarios').select('*');
    if (error) {
      throw error;
    }
    return data;
  }
 
  async addUsuario(usuario: Usuario) {
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
 
      if (fetchError && status !== 406) {  // Manejar errores que no son "No Aceptable"
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
 
  updateUsuario(id: string, updatedFields: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.localUsuarios.findIndex(u => u.id === id);
      if (index !== -1) {
        this.localUsuarios[index] = { ...this.localUsuarios[index], ...updatedFields };
        this.updatedUsuarios.push(this.localUsuarios[index]);
        this.usuariosSubject.next([...this.localUsuarios]);
        resolve();
      } else {
        reject('Usuario no encontrado');
      }
    });
  }
 
  async deleteUsuario(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const index = this.localUsuarios.findIndex(u => u.id === id);
      if (index !== -1) {
        const formValue = this.localUsuarios[index];
        this.deletedUsuarios.push(this.localUsuarios[index]);
        this.localUsuarios.splice(index, 1);
        this.usuariosSubject.next([...this.localUsuarios]);
        this.alertService.success(`Usuario "${formValue.username}" eliminado con éxito.`);
        resolve(true);
      } else {
        this.alertService.error('Usuario no encontrado.');
        reject('Usuario no encontrado');
      }
    });
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
 
  // Método para añadir cliente localmente
  addLocalCliente(cliente: Cliente) {
    this.localClientes.push(cliente);
    this.clientesSubject.next([...this.localClientes, ...this.clientesSubject.getValue()]); // Combina clientes locales y cargados
    this.alertService.success('Cliente añadido localmente.');
  }
 
  // Método para guardar todos los clientes locales en la base de datos
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
 
  async addCliente(cliente: Cliente) {
    const { data, error } = await this.supabase.from('Clientes').insert([cliente]);
    if (error) {
      console.error('Error adding client', error);
      throw error;
    } else {
      this.alertService.success('Cliente añadido a la base de datos.');
    }
  }
 
  // Asegúrate de que `loadClientes` esté correctamente llenando `localClientes`
  async loadClientes() {
    const { data, error } = await this.supabase.from('Clientes').select('*');
    if (error) {
      console.error('Error loading clients', error);
    } else {
      this.localClientes = data;
      this.clientesSubject.next(data);
    }
  }
 
  // Método para actualizar cliente localmente
  updateLocalCliente(id: number, updatedFields: any) {
    const index = this.localClientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
      this.localClientes[index] = { ...this.localClientes[index], ...updatedFields };
      this.updatedClientes.push(this.localClientes[index]);
      this.clientesSubject.next([...this.localClientes]);
    } else {
      // Maneja el caso cuando el cliente no se encuentra en la lista local
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
 
  // Método para eliminar cliente localmente
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
 
  async updateCliente(id: number, updatedFields: any) {
    const { data, error } = await this.supabase.from('Clientes').update(updatedFields).match({ id });
    if (error) {
      console.error('Error updating client', error);
      this.alertService.error('Error actualizando el cliente en la base de datos.');
      throw error;
    } else {
      this.loadClientes();
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
 
  // Añadir cuenta localmente
  addLocalCuenta(cuenta: Cuenta): void {
    this.localCuentas.push(cuenta);
    this.cuentasSubject.next([...this.localCuentas]);
    this.alertService.success('Cuenta añadida localmente.');
  }
 
  // Guardar cuentas locales en la base de datos
  async saveAllCuentas() {
    try {
      for (const cuenta of this.localCuentas) {
        if (!cuenta.id) {
          await this.addCuenta(cuenta);
        }
      }
      for (const cuenta of this.updatedCuentas) {
        const { clientName, ...cuentaSinNombre } = cuenta; // Eliminar campos innecesarios
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
 
  // Método para sincronizar cuentas locales con la base de datos
  async syncCuentas(): Promise<void> {
    try {
      // Agregar nuevas cuentas
      for (const cuenta of this.addedCuentas) {
        await this.supabase.from('Cuentas').insert([cuenta]);
      }
      // Actualizar cuentas modificadas
      for (const cuenta of this.updatedCuentas) {
        await this.supabase.from('Cuentas').update(cuenta).match({ id: cuenta.id });
      }
      // Eliminar cuentas eliminadas
      for (const cuenta of this.deletedCuentas) {
        await this.supabase.from('Cuentas').delete().match({ id: cuenta.id });
      }
 
      // Resetear las listas locales
      this.addedCuentas = [];
      this.updatedCuentas = [];
      this.deletedCuentas = [];
 
      await this.loadCuentas();
    } catch (error) {
      console.error('Error al sincronizar los cambios de las cuentas', error);
    }
  }
 
  // Método existente para añadir cuenta en la base de datos
  async addCuenta(cuenta: Cuenta): Promise<void> {
    try {
      // Crear una copia del objeto cuenta y eliminar el campo clientName
      const { clientName, ...cuentaSinNombre } = cuenta;
 
      const { data, error } = await this.supabase.from('Cuentas').insert([cuentaSinNombre]).select().single();
      if (error) {
        console.error('Error adding account', error);
        throw error;
      } else {
        // Actualizar la lista local con la cuenta guardada en la base de datos
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
 
      // Actualizar el nombre del cliente si se ha cambiado el client_id
      if (updatedFields.client_id) {
        const cliente = this.localClientes.find(cliente => cliente.id === updatedFields.client_id);
        if (cliente) {
          updatedCuenta.clientName = cliente.name;
        }
      }
 
      // Actualizar la cuenta localmente
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
      const { clientName, Cliente, ...fieldsToUpdate } = updatedFields; // Eliminar campos innecesarios
      const { data, error } = await this.supabase.from('Cuentas').update(fieldsToUpdate).eq('id', id);
      if (error) {
        console.error('Error updating account', error);
        throw new Error('Error updating account');
      }
 
      // Actualizar localmente para reflejar cambios en la interfaz
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
 
  async addTarjeta(tarjeta: Tarjeta): Promise<void> {
    try {
      const { data, error } = await this.supabase.from('Tarjetas').insert([tarjeta]).select().single();
      if (error) {
        console.error('Error adding card', error);
      } else {
        // Actualizar BehaviorSubject después de añadir la tarjeta
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
    return { error: undefined };
  }
 
  async getAllCuentas(): Promise<Cuenta[]> {
    const { data, error } = await this.supabase.from('Cuentas').select('*');
    if (error) {
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
      this.tarjetasSubject.next(data.map(tarjeta => ({
        ...tarjeta,
        account_number: tarjeta.Cuentas ? tarjeta.Cuentas.account_number : null
      })));
    }
  }
  
  async getTarjetasByUserId(userId: string): Promise<Tarjeta[]> {
    const { data, error } = await this.supabase
      .from('Tarjetas')
      .select('*')
      .eq('user_id', userId);
  
    if (error) {
      console.error('Error fetching cards for user', error);
      throw error;
    }
    return data;
  }

  async getCuentasByUserId(userId: string): Promise<Cuenta[]> {
    const { data, error } = await this.supabase
      .from('Cuentas')
      .select('*')
      .eq('user_id', userId);
  
    if (error) {
      console.error('Error fetching cards for user', error);
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
}
 