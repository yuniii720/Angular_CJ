import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SupabaseService } from '../../services/supabase.service';

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

  constructor(private supabaseService: SupabaseService) {}

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
  }
}