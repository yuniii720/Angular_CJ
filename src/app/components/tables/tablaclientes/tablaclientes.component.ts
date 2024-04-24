import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Cliente } from '../../../models/cliente.model';

@Component({
  selector: 'app-tablaclientes',
  templateUrl: './tablaclientes.component.html',
  styleUrls: ['./tablaclientes.component.css']
})
export class TablaClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.supabaseService.clientes$.subscribe(clientes => {
      this.clientes = clientes;
    });
  }
}
