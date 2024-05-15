import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Tarjeta } from '../../../models/tarjeta.model';

@Component({
  selector: 'app-tablatarjetas',
  templateUrl: './tablatarjetas.component.html',
  styleUrls: ['./tablatarjetas.component.css']  
})
export class TablaTarjetasComponent implements OnInit {

  tarjetas: Tarjeta[] = [];

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.supabaseService.tarjeta$.subscribe((tarjetas: Tarjeta[]) => {
      this.tarjetas = tarjetas;
    });
  }
}
