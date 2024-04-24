import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Cliente } from '../models/cliente.model';
import { Cuenta } from '../models/cuenta.model';

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

  constructor(private http: HttpClient) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.loadUsuarios();
    this.loadClientes();
    this.loadCuentas();
  }

  async enviarDatos(data: any): Promise<any> {
    try {
      const response = await this.http.post('URL_DEL_BACKEND/registro', data).toPromise();
      return response;
    } catch (error) {
      console.error('Error al enviar datos al backend:', error);
      throw error;
    }
  }

  async loadUsuarios() {
    const { data, error } = await this.supabase.from('Usuarios').select('*');
    if (error) console.error('Error loading users', error);
    else this.usuariosSubject.next(data);
  }

  async loadClientes() {
    const { data, error } = await this.supabase.from('Clientes').select('*');
    if (error) console.error('Error loading clients', error);
    else this.clientesSubject.next(data);
  }

  async loadCuentas() {
    const { data, error } = await this.supabase
      .from('Cuentas')
      .select(`
        *,
        Cliente:Clientes (name)
      `); // Asume que la tabla se llama 'Clientes' y hay una relación foreign key

    if (error) {
      console.error('Error loading accounts', error);
    } else {
      this.cuentasSubject.next(data.map(item => ({
        ...item,
        clientName: item.Cliente.name  // Añade el nombre del cliente directamente en el objeto de cuenta
      })));
    }
  }

  //Métodos para Usuarios

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
    else this.loadUsuarios(); // Recargar usuarios después de añadir
  }

  async updateUsuario(id: number, updatedFields: any) {
    const { data, error } = await this.supabase
      .from('Usuarios')
      .update(updatedFields)
      .match({ id });
    if (error) console.error('Error updating user', error);
    else this.loadUsuarios(); // Recargar usuarios después de actualizar
  }

  async deleteUsuario(id: number) {
    const { data, error } = await this.supabase
      .from('Usuarios')
      .delete()
      .match({ id });
    if (error) console.error('Error deleting user', error);
    else this.loadUsuarios(); // Recargar usuarios después de eliminar
  }

  //Métodos para Clientes

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
    else this.loadClientes(); // Recargar clientes después de añadir
  }

  async updateCliente(id: number, updatedFields: any) {
    const { data, error } = await this.supabase
      .from('Clientes')
      .update(updatedFields)
      .match({ id });
    if (error) console.error('Error updating client', error);
    else this.loadClientes(); // Recargar clientes después de actualizar
  }

  async deleteCliente(id: number) {
    const { data, error } = await this.supabase
      .from('Clientes')
      .delete()
      .match({ id });
    if (error) console.error('Error deleting client', error);
    else this.loadClientes(); // Recargar clientes después de eliminar
  }

  // Métodos para Cuentas

  async addCuenta(cuenta: Cuenta) {
    const { data, error } = await this.supabase.from('Cuentas').insert([cuenta]);
    if (error) console.error('Error adding account', error);
    else this.loadCuentas(); // Recargar cuentas después de añadir
  }

  async updateCuenta(id: number, updatedFields: any) {
    const { data, error } = await this.supabase
      .from('Cuentas')
      .update(updatedFields)
      .match({ id });
    if (error) console.error('Error updating account', error);
    else this.loadCuentas(); // Recargar cuentas después de actualizar
  }

  async deleteCuenta(id: number) {
    const { data, error } = await this.supabase
      .from('Cuentas')
      .delete()
      .match({ id });
    if (error) console.error('Error deleting account', error);
    else this.loadCuentas(); // Recargar cuentas después de eliminar
  }

}
