import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';

interface UserRole {
  role_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private user: User | null = null;
  private userRole: number | null = null;

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.user = session?.user ?? null;
      if (this.user) {
        this.setUserRole();
      }
    });
  }

  async signUp(email: string, password: string, username: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username
        }
      }
    });

    if (error) {
      throw error;
    }

    // Añadir usuario a la tabla Usuarios
    const user = data.user;
    if (user) {
      const { error: insertError } = await this.supabase
        .from('Usuarios')
        .insert([{ id: user.id, email, username, password }]);

      if (insertError) {
        console.error('Error adding user to Usuarios:', insertError);
        throw insertError;
      }
    }

    return user;
  }

  async signIn(email: string, password: string): Promise<any> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      await this.setUserRole();
      console.log('Rol del usuario:', this.userRole); // Mostrar el rol del usuario por consola
      this.router.navigate([{ outlets: { auth: ['main'] } }]);
    }

    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }

    this.user = null;
    this.userRole = null;
    this.router.navigateByUrl('login');
  }

  getUserId(): string | null {
    return this.user ? this.user.id : null;
  }

  private async setUserRole(): Promise<void> {
    if (this.user) {
      const { data, error } = await this.supabase
        .from('userroles')
        .select('role_id')
        .eq('user_id', this.user.id)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }

      this.userRole = data?.role_id ?? null;
    }
  }

  getUserRole(): Observable<UserRole | null> {
    if (this.userRole !== null) {
      return of({ role_id: this.userRole });
    } else {
      return new Observable<UserRole | null>((observer) => {
        this.setUserRole().then(() => {
          observer.next(this.userRole !== null ? { role_id: this.userRole } : null);
          observer.complete();
        });
      });
    }
  }
}
