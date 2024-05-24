import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { SaveResult } from '../../../../models/tarjeta.model';
import { AlertService } from '../../../../services/alert.service';
import { Tarjeta } from '../../../../models/tarjeta.model';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  creditCardForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCardComponent>,
    private supabaseService: SupabaseService,
    private alertService: AlertService
  ) {
    const cvv = Math.floor(100 + Math.random() * 900).toString();
    const currentYear = new Date().getFullYear();
    const randomYear = currentYear + Math.floor(Math.random() * 5);
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const expirationMonth = randomMonth.toString().padStart(2, '0');
    const expirationYear = randomYear.toString().slice(-2);
    const expirationDateRandom = `${expirationMonth}/${expirationYear}`;

    // Generar PIN aleatorio de 4 dígitos
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    this.creditCardForm = new FormGroup({
      cardNumber: new FormControl('', Validators.required),
      cardHolderName: new FormControl('', Validators.required),
      expirationDate: new FormControl(expirationDateRandom, Validators.required),
      securityCode: new FormControl(cvv, Validators.required),
      pin: new FormControl(pin, Validators.required),
      cardType: new FormControl('credito', Validators.required)
    });
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    if (this.creditCardForm.valid) {
      const { cardNumber, cardHolderName, expirationDate, securityCode, cardType, pin } = this.creditCardForm.value;
      const tarjeta: Omit<Tarjeta, 'id'> = { // Omitimos el campo 'id'
        saldo: 89234992349, // Valor provisional para saldo, ajustar según la lógica de la aplicación
        cardNumber,
        cardHolderName,
        expirationDate,
        securityCode,
        cardType,
        PIN: pin, // Usar el PIN generado
      };

      try {
        const result: SaveResult = await this.supabaseService.saveCreditCard(tarjeta);
        if (result.error) {
          throw new Error(result.error.message);
        }
        this.alertService.success('Tarjeta de crédito guardada con éxito.');
        this.dialogRef.close();
      } catch (error) {
        console.error('Error al guardar la tarjeta de crédito', error);
        this.alertService.error('Error al guardar la tarjeta de crédito.');
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
