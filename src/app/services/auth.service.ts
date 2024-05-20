import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase_client: SupabaseClient;

  constructor() {
    this.supabase_client = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  signUp(email: string, password: string): Promise<any> {
    return this.supabase_client.auth.signUp({
      email,
      password,
    });
  }

  async signIn(email: string, password: string): Promise<any> {
    try {
      const { data, error } = await this.supabase_client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error: any) {
      console.error('Error en signIn:', error);
      throw error;
    }
  }

  signOut(): Promise<any> {
    return this.supabase_client.auth.signOut();
  }
}
