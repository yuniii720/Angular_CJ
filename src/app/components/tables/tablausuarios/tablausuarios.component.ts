import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Usuario } from '../../../models/usuario.model';
import { EventService } from '../../../services/event.service'; // Importa el EventService

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tablausuarios.component.html',
  styleUrls: ['./tablausuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  private subs = new Subscription();
  displayedColumns: string[] = ['id', 'username', 'name', 'email', 'type', 'created_at', 'gestionar'];

  constructor(
    private supabaseService: SupabaseService,
    private eventService: EventService 
  ) {}

  ngOnInit(): void {
    this.subs.add(this.supabaseService.usuarios$.subscribe(usuarios => {
      this.usuarios = usuarios;
    }));

    this.subs.add(this.eventService.confirmEvent$.subscribe(() => {
      this.mostrarPopup(); 
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  mostrarPopup() {}
}
