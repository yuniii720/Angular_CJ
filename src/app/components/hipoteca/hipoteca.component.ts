import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hipoteca',
  templateUrl: './hipoteca.component.html',
  styleUrls: ['./hipoteca.component.scss']
})
export class HipotecaComponent implements OnInit {
  hipotecaForm: FormGroup;
  resultado: any;

  constructor() {
    this.hipotecaForm = new FormGroup({
      cantidadTotal: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      plazo: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      tipoInteres: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)])
    });
  }

  ngOnInit(): void {}

  limpiarFormulario(): void {
    this.hipotecaForm.reset();
    this.resultado = null;
  }

  calcularSimulacion(): void {
    if (this.hipotecaForm.invalid) {
      this.resultado = 'Formulario inválido';
      return;
    }

    const cantidadTotal = parseFloat(this.hipotecaForm.get('cantidadTotal')?.value);
    const plazo = parseInt(this.hipotecaForm.get('plazo')?.value, 10);
    const tipoInteres = parseFloat(this.hipotecaForm.get('tipoInteres')?.value);

    if (isNaN(cantidadTotal) || isNaN(plazo) || isNaN(tipoInteres)) {
      this.resultado = 'Caracteres no válidos';
      return;
    }

    const interesMensual = tipoInteres / 12 / 100;
    const numPagos = plazo * 12;

    const cuota = (cantidadTotal * interesMensual) / (1 - Math.pow(1 + interesMensual, -numPagos));

    if (isNaN(cuota) || !isFinite(cuota)) {
      this.resultado = 'Error en el cálculo. Verifique los valores ingresados.';
    } else {
      this.resultado = {
        cuota: cuota.toFixed(2),
        // total: total.toFixed(2) // Descomenta y usa si también tienes 'total'
      };
    }
  }
}
