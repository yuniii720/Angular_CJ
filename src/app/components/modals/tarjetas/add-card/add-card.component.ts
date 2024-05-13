import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { AlertService } from '../../../../services/alert.service';
import { Tarjeta } from '../../../../models/tarjeta.model';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  creditCardForm: FormGroup;
  tarjeta: Tarjeta | null = null; // Variable para almacenar los datos de la tarjeta

  constructor(
    public dialogRef: MatDialogRef<AddCardComponent>,
    private supabaseService: SupabaseService,
    private alertService: AlertService
  ) {
    this.creditCardForm = new FormGroup({
      cardnumber: new FormControl('', Validators.required),
      cardHolderName: new FormControl('', Validators.required),
      expirationDate: new FormControl('', Validators.required),
      securityCode: new FormControl('', Validators.required),
      cardType: new FormControl('credito', Validators.required)
    });
  }

  ngOnInit(): void {
    // Obtener los datos de la tarjeta al iniciar el componente (supongamos que la ID es 1)
    this.supabaseService.getCreditCard(1).then((tarjeta) => {
      if (tarjeta) {
        this.tarjeta = tarjeta;
        this.fillFormWithData();
      } else {
        console.error('No se pudo obtener la tarjeta de crédito');
      }
    });
  }

  fillFormWithData(): void {
    if (this.tarjeta) {
      this.creditCardForm.patchValue({
        cardnumber: this.tarjeta.cardnumber,
        cardHolderName: this.tarjeta.cardHolderName,
        expirationDate: this.tarjeta.expirationDate,
        securityCode: this.tarjeta.securityCode,
        cardType: this.tarjeta.cardType
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.creditCardForm.valid) {
      const { cardnumber, cardHolderName, expirationDate, securityCode, cardType } = this.creditCardForm.value;

      const tarjeta: Tarjeta = {
        id: 1, // Se debe proporcionar un valor adecuado para id
        saldo: 0, // Se debe proporcionar un valor adecuado para saldo
        cardnumber,
        cardHolderName,
        expirationDate,
        securityCode,
        cardType
      };

      try {
        await this.supabaseService.saveCreditCard(tarjeta);
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
