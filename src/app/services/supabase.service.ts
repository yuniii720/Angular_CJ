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

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  public usuarios$ = this.usuariosSubject.asObservable();
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();
  private cuentasSubject = new BehaviorSubject<Cuenta[]>([]);
  public cuentas$ = this.cuentasSubject.asObservable();
  private tarjetasSubject = new BehaviorSubject<Tarjeta[]>([]);
  public tarjeta$ = this.tarjetasSubject.asObservable();
  balance: any;

  constructor(private http: HttpClient) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.loadUsuarios();
    this.loadClientes();
    this.loadCuentas();
    this.loadTarjetas();
  }

  enviarDatos(data: any): Observable<any> {
    return this.http.post('https://pbjdatvfbfkhaqrxrzdg.supabase.co', data);
  }

  //Métodos para Usuarios

  async loadUsuarios() {
    const { data, error } = await this.supabase.from('Usuarios').select('*');
    if (error) console.error('Error loading users', error);
    else this.usuariosSubject.next(data);
  }

  async getAllUsuarios() {
    const { data, error } = await this.supabase
      .from('Usuarios')
      .select('*');

    if (error) throw error;
    return data;
  }

  async addUsuario(usuario: Usuario) {
    const { data, error } = await this.supabase.from('Usuarios').insert([usuario]);
    if (error) console.error('Error adding user', error);
    else this.loadUsuarios();
  }

  async updateUsuario(id: number, updatedFields: any) {
    const { data, error } = await this.supabase
      .from('Usuarios')
      .update(updatedFields)
      .match({ id });
    if (error) console.error('Error updating user', error);
    else this.loadUsuarios();
  }

  async deleteUsuario(id: number) {
    const { data, error } = await this.supabase
      .from('Usuarios')
      .delete()
      .match({ id });
    if (error) console.error('Error deleting user', error);
    else this.loadUsuarios();
  }

  //Métodos para Clientes

  async loadClientes() {
    const { data, error } = await this.supabase.from('Clientes').select('*');
    if (error) console.error('Error loading clients', error);
    else this.clientesSubject.next(data);
  }

  async getAllClientes() {
    const { data, error } = await this.supabase
      .from('Clientes')
      .select('*');

    if (error) throw error;
    return data;
  }

  async addCliente(cliente: Cliente) {
    const { data, error } = await this.supabase.from('Clientes').insert([cliente]);
    if (error) console.error('Error adding client', error);
    else this.loadClientes();
  }

  async updateCliente(id: number, updatedFields: any) {
    const { data, error } = await this.supabase
      .from('Clientes')
      .update(updatedFields)
      .match({ id });
    if (error) console.error('Error updating client', error);
    else this.loadClientes();
  }

  async deleteCliente(id: number) {
    const { data, error } = await this.supabase
      .from('Clientes')
      .delete()
      .match({ id });
    if (error) console.error('Error deleting client', error);
    else this.loadClientes();
  }

  // Métodos para Cuentas

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
    const { data, error } = await this.supabase
      .from('Cuentas')
      .delete()
      .match({ id });
    if (error) console.error('Error deleting account', error);
    else this.loadCuentas();
  }

  // Métodos para Tarjetas

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

}
