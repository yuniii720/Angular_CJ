import { Component, OnInit } from '@angular/core';
// Importamos SupabaseService en lugar de HttpClient y UsuariosService
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tablausuarios.component.html',
  styleUrls: ['./tablausuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  usuarios: any;

  // Injectamos SupabaseService en el constructor en lugar de UsuariosService
  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    (async () => {
      const { data: usuarios, error } = await this.supabaseService.supabase
        .from('usuarios')
        .select('*');

      if (error) {
        console.error('Error al cargar los usuarios:', error);
      } else {
        this.usuarios = usuarios;
        console.log('Usuarios cargados:', this.usuarios);
      }
    })();
  }

  async addUser(email: string, password: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('usuarios')
      .insert([
        { email: email, password: password }
      ]);

    if (error) {
      console.error('Error al insertar el usuario:', error);
    } else {
      console.log('Usuario insertado:', data);
    }
  }
}
