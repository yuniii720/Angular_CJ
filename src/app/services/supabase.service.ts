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

      const { data, error: insertError } = await this.supabase.from('Usuarios').insert([{
        id: authUser.id,
        email: usuario.email,
        username: usuario.username,
        name: usuario.name,
        password: usuario.password,
        type: usuario.type,
        hire_date: usuario.hire_date,
        created_at: usuario.created_at
      }]).select().single();

      if (insertError) {
        throw insertError;
      }

      this.localUsuarios.push(data);
      this.usuariosSubject.next([...this.localUsuarios]);
      return data;

    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  async addUserRole(userId: string, roleId: number): Promise<void> {
    if (!userId || !roleId) {
      console.error('Invalid userId or roleId:', { userId, roleId });
      throw new Error('Invalid userId or roleId');
    }

    const { error } = await this.supabase.from('userroles').insert([{ user_id: userId, role_id: roleId }]);
    if (error) {
      console.error('Error inserting user role:', error);
      throw error;
    }
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

  async getAllClientes() {
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
      for (const cliente of this.localClientes) {
        await this.addCliente(cliente);
      }
      for (const cliente of this.updatedClientes) {
        await this.updateCliente(cliente.id!, cliente);
      }
      for (const cliente of this.deletedClientes) {
        await this.deleteCliente(cliente.id!);
      }
      this.localClientes = [];
      this.updatedClientes = [];
      this.deletedClientes = [];
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
      this.loadClientes(); // Recargar la lista de clientes después de añadir uno nuevo
      this.alertService.success('Cliente añadido a la base de datos.');
    }
  }

  async loadClientes() {
    const { data, error } = await this.supabase.from('Clientes').select('*');
    if (error) {
      console.error('Error loading clients', error);
    } else {
      this.clientesSubject.next(data); // Notificar los clientes cargados desde la base de datos
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
      this.cuentasSubject.next(data.map(item => ({
        ...item,
        clientName: item.Cliente.name
      })));
    }
  }

  async syncCuentas() {
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

  async addCuenta(cuenta: Cuenta) {
    this.addedCuentas.push(cuenta);
    this.localCuentas.push(cuenta);
    this.cuentasSubject.next([...this.localCuentas]);
  }

  async updateCuenta(id: number, updatedFields: any): Promise<void> {
    const index = this.localCuentas.findIndex(c => c.id === id);
    if (index !== -1) {
      this.localCuentas[index] = { ...this.localCuentas[index], ...updatedFields };
      this.updatedCuentas.push(this.localCuentas[index]);
      this.cuentasSubject.next([...this.localCuentas]);
    } else {
      throw new Error('Cuenta no encontrada');
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
    let number = '';
    for (let i = 0; i < 4; i++) {
      number += Math.floor(1000 + Math.random() * 9000).toString();
      if (i < 3) number += '-';
    }
    return number;
  }

  // Tarjetas
  async loadTarjetas() {
    const { data, error } = await this.supabase
      .from('Tarjetas')
      .select('*');

    if (error) {
      console.error('Error loading cards', error);
    } else {
      this.tarjetasSubject.next(data.map(item => ({
        ...item
      })));
    }
  }

  async addTarjeta(tarjeta: Tarjeta) {
    try {
      const { data, error } = await this.supabase.from('Tarjetas').insert([tarjeta]);
      if (error) {
        console.error('Error adding card', error);
      } else {
        this.loadTarjetas();
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
    const { data, error } = await this.supabase
      .from('Tarjetas')
      .insert([
        {
          saldo: tarjeta.saldo,
          cardNumber: tarjeta.cardNumber,
          cardHolderName: tarjeta.cardHolderName,
          expirationDate: tarjeta.expirationDate,
          securityCode: tarjeta.securityCode,
          cardType: tarjeta.cardType,
          PIN: tarjeta.PIN
        }
      ]);

    if (error) {
      return { error };
    }
    return { error: undefined };
  }

  async getCreditCard(id: number): Promise<Tarjeta | null> {
    const { data, error } = await this.supabase
      .from('Tarjetas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching credit card', error);
      return null;
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

