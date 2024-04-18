import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://pbjdatvfbfkhaqrxrzdg.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiamRhdHZmYmZraGFxcnhyemRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzA0OTUsImV4cCI6MjAyOTAwNjQ5NX0.c-OqL72CZnVcBSMMRitbiN5VUzZF6SDrRuwLHA-i7jk'; // Usa tu ANON KEY aquí
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }
  async addCliente(nombre: string, dni: string, email: string, fechaNacimiento: string, fechaAlta: string) {
    const { data, error } = await this.supabase
      .from('Clientes')
      .insert([
        { nombre, dni, email, fecha_nacimiento: fechaNacimiento, fecha_alta: fechaAlta }
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
}
