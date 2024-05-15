import { Component, OnInit, Inject } from '@angular/core'; // Importar Inject
import { SupabaseService } from '../../services/supabase.service';
import { Tarjeta } from '../../models/tarjeta.model';

@Component({
  selector: 'app-tarjetavisual',
  templateUrl: './tarjetavisual.component.html',
  styleUrls: ['./tarjetavisual.component.scss']
})
export class TarjetavisualComponent implements OnInit {
  tarjetas: Tarjeta[] = [];

  constructor(@Inject(SupabaseService) private supabaseService: SupabaseService) {} // Usar @Inject

  ngOnInit(): void {
    this.cargarTarjetas();
  }

  cargarTarjetas() {
    this.supabaseService.tarjeta$.subscribe((tarjetas: Tarjeta[]) => { // Especificar el tipo de tarjetas
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
