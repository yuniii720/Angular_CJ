import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hipoteca',
  templateUrl: './hipoteca.component.html',
  styleUrls: ['./hipoteca.component.scss'] // Cambiado de styleUrl a styleUrls
})
export class HipotecaComponent implements OnInit {
  // Formulario para la simulación de hipoteca
  hipotecaForm: FormGroup;

  // Resultados de la simulación
  resultado: any;

  constructor() {
    this.hipotecaForm = new FormGroup({
      cantidadTotal: new FormControl('', Validators.required),
      plazo: new FormControl('', Validators.required),
      tipoInteres: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void { }

  // Función para limpiar campos
  limpiarFormulario(): void {
    this.hipotecaForm.reset();
  }

  // Función para calcular la simulación de hipoteca
  calcularSimulacion(): void {
    const cantidadTotal = this.hipotecaForm.get('cantidadTotal')?.value;
    const plazo = this.hipotecaForm.get('plazo')?.value;
    const tipoInteres = this.hipotecaForm.get('tipoInteres')?.value;

    // Cálculo de la simulación de hipoteca (simplificado)
    const interesMensual = tipoInteres / 12 / 100;
    const numPagos = plazo * 12;

    const cuota = (cantidadTotal * interesMensual) / (1 - Math.pow(1 + interesMensual, -numPagos));

    this.resultado = {
      cuota: cuota.toFixed(2),
      // total: total.toFixed(2)
    };
  }
}
