import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SupabaseService } from '../../services/supabase.service';
import { Cuenta } from '../../models/cuenta.model';
import { from } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
  cuentas: Cuenta[] = [];
  ingresosData: number[] = [];
  fechasData: string[] = [];

  constructor(private supabaseService: SupabaseService, private authService: AuthService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.obtenerDatos();
    this.generarDatosFicticios();
    this.inicializarChart();
  }

  obtenerDatos(): void {
    this.supabaseService.getSaldoTotal().subscribe(saldo => this.saldoTotal = saldo);
    this.supabaseService.getCuentasActivas().subscribe(cuentas => this.cuentasActivas = cuentas);
    this.supabaseService.getTarjetasActivas().subscribe(tarjetas => this.tarjetasActivas = tarjetas);
    this.supabaseService.getDeudaTotal().subscribe(deuda => this.deudaTotal = deuda);
    this.supabaseService.getOperacionesRecientes().subscribe(operaciones => this.operacionesRecientes = operaciones);
    this.supabaseService.getTarjetas().subscribe(tarjetas => this.tarjetas = tarjetas);
    this.supabaseService.getMovimientos().subscribe(movimientos => this.movimientos = movimientos);

    const userId = this.authService.getUserId();
    if (userId) {
      from(this.supabaseService.getCuentasByUserId(userId)).subscribe((cuentas: Cuenta[]) => {
        this.cuentas = cuentas;
        console.log("Cuentas obtenidas:", this.cuentas); // Verifica que las cuentas se están cargando
        this.actualizarChart();
      });
    }
  }

  generarDatosFicticios(): void {
    const ingresosFicticios = [5000, 10000, 15000, 20000, 25000, 30000, 33235];
    const fechasFicticias = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06'];

    this.ingresosData = ingresosFicticios;
    this.fechasData = fechasFicticias;
  }

  inicializarChart(): void {
    const ctx = document.getElementById('ingresosChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.fechasData,
        datasets: [
          {
            label: 'Ingresos',
            data: this.ingresosData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fecha'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Monto (EUR)'
            }
          }
        }
      }
    });
  }

  actualizarChart(): void {
    this.inicializarChart(); // Re-inicializa el gráfico con los nuevos datos
  }
}
