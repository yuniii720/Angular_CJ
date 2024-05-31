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

  constructor(
    public dialogRef: MatDialogRef<ModCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { tarjeta: Tarjeta },
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private alertService: AlertService
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
            this.alertService.success('Tarjeta actualizada con éxito');
            this.dialogRef.close(true); // Cerrar el modal con true indicando éxito
          })
          .catch(error => {
            this.alertService.error('Error al actualizar tarjeta');
            console.error('Error al actualizar tarjeta:', error);
          });
      } else {
        console.error('El id de la tarjeta es undefined');
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false); // Cerrar el modal sin cambios
  }
}
