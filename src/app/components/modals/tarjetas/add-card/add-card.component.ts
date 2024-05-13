import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService, SaveResult } from '../../../../services/supabase.service'; // Importa SaveResult desde SupabaseService
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
    this.creditCardForm = new FormGroup({
      cardNumber: new FormControl('', Validators.required),
      cardHolderName: new FormControl('', Validators.required),
      expirationDate: new FormControl('', Validators.required),
      securityCode: new FormControl('', Validators.required),
      cardType: new FormControl('credito', Validators.required)
    });
  }

  ngOnInit(): void {
    // No se necesita obtener datos al iniciar el componente
  }

  async onSubmit(): Promise<void> {
    if (this.creditCardForm.valid) {
      const { cardNumber, cardHolderName, expirationDate, securityCode, cardType } = this.creditCardForm.value;

      const tarjeta: Tarjeta = {
        id: '1', // Cambia el valor de id a string
        saldo: 0, // Valor provisional para saldo, ajustar según la lógica de la aplicación
        cardNumber,
        cardHolderName,
        expirationDate,
        securityCode,
        cardType
      };

      try {
        const result: SaveResult = await this.supabaseService.saveCreditCard(tarjeta);
        if (result.error) {
          throw new Error(result.error.message);
        }
        this.alertService.success('Tarjeta de crédito guardada con éxito.');
      } catch (error) {
        console.error('Error al guardar la tarjeta de crédito', error);
        this.alertService.error('Error al guardar la tarjeta de crédito.');
      } finally {
        this.dialogRef.close();
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
