import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Usuario } from '../models/usuario.model';
import { Cliente } from '../models/cliente.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  public usuarios$ = this.usuariosSubject.asObservable();
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientesSubject.asObservable();

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.loadUsuarios(); // Cargar inicialmente todos los usuarios
    this.loadClientes(); // Cargar inicialmente todos los clientes
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

  // Métodos para Usuarios

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

  // Métodos para Clientes

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

}
