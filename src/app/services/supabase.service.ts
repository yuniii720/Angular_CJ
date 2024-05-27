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

  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();
  private cuentasSubject = new BehaviorSubject<Cuenta[]>([]);
  public cuentas$ = this.cuentasSubject.asObservable();
  private tarjetasSubject = new BehaviorSubject<Tarjeta[]>([]);
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
    const { error } = await this.supabase.from('UserRoles').insert([{ user_id: userId, role_id: roleId }]);
    if (error) {
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

  // Clientes
  async loadClientes() {
    const { data, error } = await this.supabase.from('Clientes').select('*');
    if (error) {
      console.error('Error loading clients', error);
    } else {
      this.clientesSubject.next(data);
    }
  }

  async getAllClientes() {
    const { data, error } = await this.supabase.from('Clientes').select('*');
    if (error) {
      throw error;
    }
    return data;
  }

  async addCliente(cliente: Cliente) {
    const { data, error } = await this.supabase.from('Clientes').insert([cliente]);
    if (error) {
      console.error('Error adding client', error);
    } else {
      this.loadClientes();
    }
  }

  async updateCliente(id: number, updatedFields: any) {
    const { data, error } = await this.supabase.from('Clientes').update(updatedFields).match({ id });
    if (error) {
      console.error('Error updating client', error);
    } else {
      this.loadClientes();
    }
  }

  async deleteCliente(id: number) {
    const { data, error } = await this.supabase.from('Clientes').delete().match({ id });
    if (error) {
      console.error('Error deleting client', error);
    } else {
      this.loadClientes();
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

  async addCuenta(cuenta: Cuenta) {
    cuenta.account_number = this.generateAccountNumber();
    const { data, error } = await this.supabase.from('Cuentas').insert([cuenta]);
    if (error) {
      console.error('Error adding account', error);
    } else {
      this.loadCuentas();
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

  async updateCuenta(id: number, updatedFields: any): Promise<void> {
    const { data, error } = await this.supabase.from('Cuentas').update(updatedFields).match({ id });
    if (error) {
      console.error('Error updating account', error);
      throw new Error(error.message);
    } else {
      this.loadCuentas();
    }
  }

  async deleteCuenta(id: number) {
    const { data, error } = await this.supabase.from('Cuentas').delete().match({ id });
    if (error) {
      console.error('Error deleting account', error);
    } else {
      this.loadCuentas();
    }
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
}
