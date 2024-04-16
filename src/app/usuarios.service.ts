import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuariosUrl = 'assets/usuarios.json';

  constructor(private http: HttpClient) { }

  getUsuarios() {
    return this.http.get(this.usuariosUrl);
  }

  getUsuario(id: number) {
    return this.http.get(this.usuariosUrl + '/' + id);
  }

  createUsuario(usuario: any) {
    return this.http.post(this.usuariosUrl, usuario);
  }

  updateUsuario(id: number, usuario: any) {
    return this.http.put(this.usuariosUrl + '/' + id, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete(this.usuariosUrl + '/' + id);
  }

}
