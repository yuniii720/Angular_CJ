import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Usuario } from '../../../models/usuario.model';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tablausuarios.component.html',
  styleUrls: ['./tablausuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  private subs = new Subscription();

  constructor(
    private supabaseService: SupabaseService,
    private eventService: EventService 
  ) {}

  ngOnInit(): void {
    this.subs.add(this.supabaseService.usuarios$.subscribe(usuarios => {
      this.usuarios = usuarios;
    }));

    this.subs.add(this.eventService.confirmDialog$.subscribe(() => {
      this.mostrarPopup();
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  mostrarPopup() {
    alert('¡Confirmación recibida en la tabla de usuarios!');
  }
}
