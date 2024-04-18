import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Cliente } from '../models/cliente.model'; // Asegúrate de que la ruta sea correcta basada en tu estructura de archivos

@Component({
  selector: 'app-tablaclientes',
  templateUrl: './tablaclientes.component.html',
  styleUrls: ['./tablaclientes.component.css']
})
export class TablaClientesComponent implements OnInit {

  clientes: Cliente[] = []; // Usa el modelo Cliente para la tipificación de tu array de clientes

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
      birth_date: '1990-01-01', // Asegúrate de que el formato de fecha sea correcto
      city: 'Almería',
      created_at: new Date().toISOString() // Asegúrate de que el formato sea el esperado por tu DB
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
