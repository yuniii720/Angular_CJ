import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

interface UserRole {
  role_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private user: User | null = null;
  private userRoleSubject = new BehaviorSubject<UserRole | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.user = session?.user ?? null;
      if (this.user) {
        this.setUserRole();
      } else {
        this.userRoleSubject.next(null);
        localStorage.removeItem('userRole');
      }
    });

    // Cargar el rol del usuario desde el almacenamiento local si está disponible
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.userRoleSubject.next(JSON.parse(storedRole));
    }
  }

  async signUp(email: string, password: string, username: string, name: string, type: string): Promise<any> {
    // Registrar el usuario en auth.users
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      throw error;
    }

    const user = data.user;
    if (user) {
      // Insertar el usuario en la tabla Usuarios
      const { error: insertError } = await this.supabase
        .from('Usuarios')
        .insert([{ id: user.id, email, username, name, type }]);

      if (insertError) {
        console.error('Error adding user to Usuarios:', insertError);
        throw insertError;
      }

      // Insertar la relación del rol en la tabla userroles
      const roleId = this.getRoleIdFromType(type);
      const { error: userRoleError } = await this.supabase
        .from('userroles')
        .insert([{ user_id: user.id, role_id: roleId }]);

      if (userRoleError) {
        console.error('Error adding user role to userroles:', userRoleError);
        throw userRoleError;
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
      this.getUserRole().subscribe((userRole) => {
        if (userRole && (userRole.role_id === 1 || userRole.role_id === 2)) {
          this.router.navigate([{ outlets: { auth: ['main'] } }]);
        } else {
          this.router.navigate([{ outlets: { auth: ['maincliente'] } }]);
        }
      });
    }

    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw error;
    }

    this.user = null;
    this.userRoleSubject.next(null);
    localStorage.removeItem('userRole');
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
        this.userRoleSubject.next(null);
        localStorage.removeItem('userRole');
      } else {
        const userRole = { role_id: data?.role_id ?? null };
        this.userRoleSubject.next(userRole);
        localStorage.setItem('userRole', JSON.stringify(userRole));
      }
    }
  }

  getUserRole(): Observable<UserRole | null> {
    return this.userRoleSubject.asObservable();
  }

  private getRoleIdFromType(type: string): number {
    switch (type) {
      case 'Empleado':
        return 2;
      case 'Administrador':
        return 1;
      default:
        throw new Error('Invalid user type');
    }
  }
}
