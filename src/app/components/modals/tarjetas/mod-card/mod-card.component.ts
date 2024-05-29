import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { Tarjeta } from '../../../../models/tarjeta.model';
import { Cliente } from '../../../../models/cliente.model';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-mod-card',
  templateUrl: './mod-card.component.html',
  styleUrls: ['./mod-card.component.css']
})
export class ModCardComponent implements OnInit {
  tarjetaForm: FormGroup;
  clientes: Cliente[] = [];
  AlertService: any;

  constructor(
    public dialogRef: MatDialogRef<ModCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tarjeta: Tarjeta },
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.tarjetaForm = this.fb.group({
      cardNumber: [{ value: data.tarjeta.cardNumber, disabled: true }, Validators.required],
      cardHolderName: [data.tarjeta.cardHolderName, Validators.required],
      expirationDate: [this.parseDate(data.tarjeta.expirationDate), Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  async loadClientes(): Promise<void> {
    try {
      this.clientes = await this.supabaseService.getAllClientes();
    } catch (error) {
      console.error('Error loading clients', error);
    }
  }

  parseDate(dateString: string): Date {
    const [month, year] = dateString.split('/');
    const parsedDate = new Date(Number(`20${year}`), Number(month) - 1, 1);
    return parsedDate;
  }

  onSubmit(): void {
    if (this.tarjetaForm.valid) {
      const updatedFields = {
        cardHolderName: this.tarjetaForm.get('cardHolderName')?.value,
        expirationDate: this.tarjetaForm.get('expirationDate')?.value
      };
      const tarjetaId = this.data.tarjeta.id;

      if (tarjetaId !== undefined) {
        this.supabaseService.updateTarjeta(tarjetaId, updatedFields)
          .then(() => {
            console.log('Tarjeta actualizada con éxito');
            this.AlertService.success('Tarjeta actualizada con éxito');
            this.dialogRef.close();
          })
          .catch(error => {
            this.AlertService.error('Error al actualizar tarjeta');
            console.error('Error al actualizar tarjeta:', error);
            // Manejar el error, mostrar un mensaje al usuario, etc.
          });
      } else {
        console.error('El id de la tarjeta es undefined');
        // Manejar el caso en que el id de la tarjeta sea undefined
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
