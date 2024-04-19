import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Cliente } from './models/cliente.model';
import { Usuario } from './models/usuario.model';
import { environment } from '../app/environments/environment'; // Asegúrate de que la ruta al archivo sea correcta

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }
  async addCliente(cliente: Cliente) {
    const { data, error } = await this.supabase
      .from('Clientes')
      .insert([
        cliente
      ]);

    if (error) throw error;
    return data;
  }

  async getAllClientes() {
    const { data, error } = await this.supabase
      .from('Clientes')
      .select('*');

    if (error) throw error;
    return data;
  }
  async updateCliente(id: number, updatedFields: any) {
    const { data, error } = await this.supabase
      .from('Clientes')
      .update(updatedFields)
      .match({ id });

    if (error) throw error;
    return data;
  }
  async deleteCliente(id: number) {
    const { data, error } = await this.supabase
      .from('Clientes')
      .delete()
      .match({ id });

    if (error) throw error;
    return data;
  }

  async addUsuario(usuario: Usuario) {
    const { data, error } = await this.supabase
      .from('Usuarios')
      .insert([
        usuario
      ]);

    if (error) throw error;
    return data;
  }

  async getAllUsuarios() {
    const { data, error } = await this.supabase
      .from('Usuarios')
      .select('*');

    if (error) throw error;
    return data;
  }
  async updateUsuario(id: number, updatedFields: any) {
    const { data, error } = await this.supabase
      .from('Usuarios')
      .update(updatedFields)
      .match({ id });

    if (error) throw error;
    return data;
  }
  async deleteUsuario(id: number) {
    const { data, error } = await this.supabase
      .from('Usuarios')
      .delete()
      .match({ id });

    if (error) throw error;
    return data;
  }
}
