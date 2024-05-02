import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Cliente } from '../../../models/cliente.model';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-tablaclientes',
  templateUrl: './tablaclientes.component.html',
  styleUrls: ['./tablaclientes.component.css']
})
export class TablaClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private supabaseService: SupabaseService, private eventService: EventService) { }

  ngOnInit(): void {
    this.supabaseService.clientes$.subscribe(clientes => {
      this.clientes = clientes;
    });

    this.eventService.confirmEvent$.subscribe(() => {
      this.mostrarPopup();
    });
  }

  mostrarPopup() {
    alert('¡Confirmación recibida!');
  }
}
