import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-maincliente',
  templateUrl: './maincliente.component.html',
  styleUrls: ['./maincliente.component.css']
})
export class MainclienteComponent implements OnInit {

  constructor(private supabaseService: SupabaseService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [{
          label: 'Saldo Mensual',
          data: [12000, 15000, 13000, 17000, 18000, 16000, 19000],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
