import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Tarjeta } from '../../models/tarjeta.model';

@Component({
  selector: 'app-tarjetavisual',
  templateUrl: './tarjetavisual.component.html',
  styleUrls: ['./tarjetavisual.component.scss']
})
export class TarjetavisualComponent implements OnInit {
  tarjetas: Tarjeta[] = [];

  constructor(private supabaseService: SupabaseService) {} // No es necesario @Inject aquí

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas(): void {
    this.supabaseService.tarjetas$.subscribe((tarjetas: Tarjeta[]) => { // Cambiar a tarjetas$
      this.tarjetas = tarjetas;
    });
  }

  async eliminarTarjeta(id: number): Promise<void> {
    try {
      const confirmar = confirm('¿Estás seguro de que deseas eliminar esta tarjeta?');
      if (confirmar) {
        await this.supabaseService.deleteTarjeta(id);
        // Actualizar la lista de tarjetas después de la eliminación
        this.cargarTarjetas();
      }
    } catch (error) {
      console.error('Error al eliminar la tarjeta', error);
    }
  }
}
