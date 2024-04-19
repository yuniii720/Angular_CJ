import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tablausuarios.component.html',
  styleUrls: ['./tablausuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.supabaseService.getAllUsuarios()
      .then(usuarios => {
        this.usuarios = usuarios;
        console.log('Usuarios cargados:', this.usuarios);
      })
      .catch(error => {
        console.error('Error al cargar los usuarios:', error);
      });
  }

  addNewUsuario(): void {
    const newUsuario: Usuario = {
      username: 'jperez',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      password: '1234',
      type: 'Administrador',
      created_at: new Date().toISOString()
    };

    this.supabaseService.addUsuario(newUsuario)
      .then(data => {
        console.log('Usuario añadido', data);
        this.loadUsuarios();
      })
      .catch(error => {
        console.error('Error al añadir Usuario', error);
      });
  }

}
