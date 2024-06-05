import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SupabaseService } from '../../services/supabase.service';
import { Movimiento } from '../../models/movimiento.model';

@Component({
  selector: 'app-maincliente',
  templateUrl: './maincliente.component.html',
  styleUrls: ['./maincliente.component.css']
})
export class MainclienteComponent implements OnInit {

  saldoTotal: number = 0;
  cuentasActivas: number = 0;
  tarjetasActivas: number = 0;
  deudaTotal: number = 0;
  operacionesRecientes: { descripcion: string, monto: number }[] = [];
  tarjetas: { cardNumber: string, saldo: number }[] = [];
  movimientos: { category: string, transaction: string, amount: number, date: string, channel: string, status: string }[] = [];

  constructor(private supabaseService: SupabaseService) {
    Chart.register(...registerables); // Asegúrate de que Chart.js esté registrado correctamente
  }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.supabaseService.getSaldoTotal().subscribe(saldo => this.saldoTotal = saldo);
    this.supabaseService.getCuentasActivas().subscribe(cuentas => this.cuentasActivas = cuentas);
    this.supabaseService.getTarjetasActivas().subscribe(tarjetas => this.tarjetasActivas = tarjetas);
    this.supabaseService.getDeudaTotal().subscribe(deuda => this.deudaTotal = deuda);
    this.supabaseService.getOperacionesRecientes().subscribe(operaciones => this.operacionesRecientes = operaciones);
    this.supabaseService.getTarjetas().subscribe(tarjetas => this.tarjetas = tarjetas);
    this.supabaseService.getMovimientos().subscribe(movimientos => this.movimientos = movimientos);
  }
}
