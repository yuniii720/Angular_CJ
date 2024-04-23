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
    this.loadClientes();
  }

  loadClientes(): void {
    this.supabaseService.getAllClientes()
      .then(clientes => {
        this.clientes = clientes;
        console.log('Clientes cargados:', this.clientes);
      })
      .catch(error => {
        console.error('Error al cargar los clientes:', error);
      });
  }

  addNewCliente(): void {
    const newCliente: Cliente = {
      name: 'Juan Perez',
      dni: '12345678D',
      email: 'juan@example.com',
      birth_date: '1990-01-01',
      city: 'Almería',
      created_at: new Date().toISOString()
    };

    this.supabaseService.addCliente(newCliente)
      .then(data => {
        console.log('Cliente añadido', data);
        this.loadClientes();
      })
      .catch(error => {
        console.error('Error al añadir cliente', error);
      });
  }

}
