import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Tarjeta } from '../../../models/tarjeta.model';

@Component({
  selector: 'app-tablatarjetas',
  templateUrl: './tablatarjetas.component.html',
  styleUrls: ['./tablatarjetas.component.scss']
})
export class TablaTarjetasComponent implements OnInit {
  tarjetas: Tarjeta[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas() {
    this.supabaseService.tarjeta$.subscribe((tarjetas: Tarjeta[]) => {
      this.tarjetas = tarjetas;
    });
  }

  async eliminarTarjeta(id: number) {
    try {
      const confirmar = confirm('¿Estás seguro de que deseas eliminar esta tarjeta?');
      if (confirmar) {
        await this.supabaseService.deleteTarjeta(id);
      }
    } catch (error) {
      console.error('Error al eliminar la tarjeta', error);
    }
  }
}
