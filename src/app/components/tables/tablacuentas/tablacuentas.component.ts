import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupabaseService } from '../../../services/supabase.service';
import { Cuenta } from '../../../models/cuenta.model'; // Asegúrate de tener un modelo adecuado

@Component({
  selector: 'app-tabla-cuentas',
  templateUrl: './tablacuentas.component.html',
  styleUrls: ['./tablacuentas.component.css']
})
export class TablaCuentasComponent implements OnInit, OnDestroy {
  cuentas: Cuenta[] = [];
  private subs = new Subscription();

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    // Asegúrate de que el servicio tiene un método 'loadCuentas' que actualiza 'cuentas$'
    this.supabaseService.loadCuentas(); // Si es necesario cargar cuentas al inicializar
    this.subs.add(this.supabaseService.cuentas$.subscribe(cuentas => {
      this.cuentas = cuentas;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe(); // Limpiar la subscripción para evitar pérdidas de memoria
  }
}
