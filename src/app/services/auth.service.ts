import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private user: User | null = null;
  private userRole: string | null = null;

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.user = session?.user ?? null;
      if (this.user) {
        this.setUserRole().then(); // Llamada inicial para establecer el rol del usuario
      }
    });
  }

  async signUp(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data.user;
  }

  async signIn(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    this.router.navigateByUrl('/main'); // Redirige a la página principal después de iniciar sesión
    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }

    this.user = null;
    this.userRole = null;
    this.router.navigateByUrl('/login'); // Redirige a la página de inicio de sesión después de cerrar sesión
  }

  getUserId(): string | null {
    return this.user ? this.user.id : null;
  }

  private async setUserRole(): Promise<void> {
    if (this.user) {
      const { data, error } = await this.supabase
        .from('userroles')
        .select('roles(name)')
        .eq('user_id', this.user.id)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }

      if (data && data.roles && data.roles.length > 0) {
        this.userRole = data.roles[0].name;
      } else {
        this.userRole = null;
      }
    }
  }

  getUserRole(): Observable<string | null> {
    if (this.userRole !== null) {
      return of(this.userRole);
    } else {
      return from(this.setUserRole().then(() => this.userRole));
    }
  }
}
