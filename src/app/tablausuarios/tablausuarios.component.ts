import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tablausuarios.component.html',
  styleUrls: ['./tablausuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  usuarios: any;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuariosService.getUsuarios()
      .subscribe( (response: any) => {
        this.usuarios = response.usuarios
      })
  }
}
