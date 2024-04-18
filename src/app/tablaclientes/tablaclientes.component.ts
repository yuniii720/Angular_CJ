import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-tablaclientes',
  templateUrl: './tablaclientes.component.html',
  styleUrls: ['./tablaclientes.component.css'] // Asegúrate de que el nombre del archivo es correcto
})
export class TablaClientesComponent implements OnInit {

  clientes: any[] = []; // Inicializa la variable para almacenar los clientes

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.loadClientes(); // Carga los clientes al inicializar el componente
  }

  // Método para cargar los clientes
  loadClientes(): void {
    this.supabaseService.getAllClientes() // Suponiendo que este método ya está implementado en SupabaseService
      .then(clientes => {
        this.clientes = clientes;
        console.log('Clientes cargados:', this.clientes);
      })
      .catch(error => {
        console.error('Error al cargar los clientes:', error);
      });
  }

  // Método para añadir un nuevo cliente
  addNewCliente(): void {
    this.supabaseService.addCliente('Juan Perez', '12345678D', 'juan@example.com', '1990-01-01', new Date().toISOString())
      .then(data => {
        console.log('Cliente añadido', data);
        this.loadClientes(); // Recarga la lista de clientes después de añadir uno nuevo
      })
      .catch(error => {
        console.error('Error al añadir cliente', error);
      });
  }

}
