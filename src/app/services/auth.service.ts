import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthError } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async signUp(email: string, password: string, username: string): Promise<any> {
    const { data, error }: { data: { user: any, session: any }, error: AuthError | null } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data.user;
  }

  async signIn(email: string, password: string): Promise<any> {
    const { data, error }: { data: { user: any, session: any }, error: AuthError | null } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data.user;
  }

  async signOut(): Promise<any> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }
}
