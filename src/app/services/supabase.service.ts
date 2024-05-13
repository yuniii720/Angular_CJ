import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Cliente } from '../models/cliente.model';
import { Cuenta } from '../models/cuenta.model';
import { Tarjeta } from '../models/tarjeta.model';
import { AlertService } from '../services/alert.service';

import { v4 as uuidv4 } from 'uuid';

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
  public tarjeta$ = this.tarjetasSubject.asObservable();
  balance: any;

  constructor(private http: HttpClient, private alertService: AlertService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.loadUsuarios();
    this.loadClientes();
    this.loadCuentas();
    this.loadTarjetas();
  }

  enviarDatos(data: any): Observable<any> {
    return this.http.post('https://pbjdatvfbfkhaqrxrzdg.supabase.co', data);
  }

  async loadUsuarios() {
    const { data, error } = await this.supabase.from('Usuarios').select('*').order('id', { ascending: true });
    if (error) console.error('Error loading users', error);
    else {
      this.usuariosSubject.next(data);
      this.localUsuarios = [...data];
    }
  }

  async getAllUsuarios() {
    const { data, error } = await this.supabase.from('Usuarios').select('*');

    if (error) throw error;
    return data;
  }

  addUsuario(usuario: Usuario) {
    return this.supabase.from('Usuarios').insert([usuario]).then(response => {
      if (response.error) {
        console.error('Failed to add user:', response.error.message);
        throw response.error;
      }
      console.log('User added successfully:', response.data);
      this.localUsuarios.push(usuario);
      this.usuariosSubject.next([...this.localUsuarios]);
    });
  }

  updateUsuario(id: number, updatedFields: any): Promise<void> {
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

  async deleteUsuario(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const index = this.localUsuarios.findIndex(u => u.id === id);
      if (index !== -1) {
        this.deletedUsuarios.push(this.localUsuarios[index]);
        this.localUsuarios.splice(index, 1);
        this.usuariosSubject.next([...this.localUsuarios]);
        this.alertService.success('Usuario eliminado con éxito.');
        resolve(true);
      } else {
        this.alertService.error('Usuario no encontrado.');
        reject('Usuario no encontrado');
      }
    });
  }

  async syncUsuarios() {
    try {
      for (const usuario of this.addedUsuarios) {
        await this.supabase.from('Usuarios').insert([usuario]);
      }
      for (const usuario of this.updatedUsuarios) {
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

  async loadClientes() {
    const { data, error } = await this.supabase.from('Clientes').select('*');
    if (error) console.error('Error loading clients', error);
    else this.clientesSubject.next(data);
  }

  async getAllClientes() {
    const { data, error } = await this.supabase.from('Clientes').select('*');

    if (error) throw error;
    return data;
  }

  async addCliente(cliente: Cliente) {
    const { data, error } = await this.supabase.from('Clientes').insert([cliente]);
    if (error) console.error('Error adding client', error);
    else this.loadClientes();
  }

  async updateCliente(id: number, updatedFields: any) {
    const { data, error } = await this.supabase.from('Clientes').update(updatedFields).match({ id });
    if (error) console.error('Error updating client', error);
    else this.loadClientes();
  }

  async deleteCliente(id: number) {
    const { data, error } = await this.supabase.from('Clientes').delete().match({ id });
    if (error) console.error('Error deleting client', error);
    else this.loadClientes();
  }

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
      console.log('Account updated successfully', data);
      this.loadCuentas();
    }
  }

  async deleteCuenta(id: number) {
    const { data, error } = await this.supabase.from('Cuentas').delete().match({ id });
    if (error) console.error('Error deleting account', error);
    else this.loadCuentas();
  }

  async loadTarjetas() {
    const { data, error } = await this.supabase
      .from('Tarjetas')
      .select(`
        *,
        Cliente:Clientes (name)
      `);

    if (error) {
      console.error('Error loading cards', error);
    } else {
      this.tarjetasSubject.next(data.map(item => ({
        ...item,
        clientName: item.Cliente.name
      })));
    }
  }

  async addTarjeta(tarjeta: Tarjeta) {
    try {
      tarjeta.id = uuidv4();
      const { data, error } = await this.supabase.from('Tarjetas').insert([tarjeta]);
      if (error) {
        console.error('Error adding card', error);
      } else {
        console.log('Card added successfully', data);
        this.loadTarjetas();
      }
    } catch (error) {
      console.error('Error adding card', error);
      throw error;
    }
  }

  async updateTarjeta(id: number, updatedFields: any): Promise<void> {
    const { data, error } = await this.supabase.from('Tarjetas').update(updatedFields).match({ id });
    if (error) {
      console.error('Error updating card', error);
      throw new Error(error.message);
    } else {
      console.log('Card updated successfully', data);
      this.loadTarjetas();
    }
  }

  async deleteTarjeta(id: number) {
    const { data, error } = await this.supabase.from('Tarjetas').delete().match({ id });
    if (error) console.error('Error deleting card', error);
    else this.loadTarjetas();
  }

  async saveCreditCard(tarjeta: Tarjeta): Promise<SaveResult> {
    try {
      tarjeta.id = uuidv4();
      const { data, error } = await this.supabase.from('Tarjetas').insert([tarjeta]);
      if (error) {
        console.error('Error saving credit card', error);
        return { error: { message: 'Error al guardar la tarjeta de crédito.' } };
      } else {
        console.log('Credit card saved successfully', data);
        this.loadTarjetas();
        return {};
      }
    } catch (error) {
      console.error('Error saving credit card', error);
      throw error;
    }
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
