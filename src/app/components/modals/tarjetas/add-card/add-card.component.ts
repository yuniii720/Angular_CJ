import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../../services/supabase.service';
import { SaveResult } from '../../../../models/tarjeta.model';
import { AlertService } from '../../../../services/alert.service';
import { Tarjeta } from '../../../../models/tarjeta.model';
import { Cliente } from '../../../../models/cliente.model';
import { Cuenta } from '../../../../models/cuenta.model'; 

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  creditCardForm: FormGroup;
  clientes: Cliente[] = [];
  cuentas: Cuenta[] = []; 
  filteredCuentas: Cuenta[] = []; 

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
      expirationDate: new FormControl(expirationDateRandom, Validators.required),
      securityCode: new FormControl(cvv, Validators.required),
      pin: new FormControl(pin, Validators.required),
      cardType: new FormControl('Crédito', Validators.required),
      clientId: new FormControl('', Validators.required),
      cardHolderName: new FormControl('', Validators.required), // Añadir el campo cardHolderName
      accountId: new FormControl('', Validators.required) // Añadir el campo accountId
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadClientes();
    await this.loadCuentas(); // Cargar las cuentas al inicializar el componente
  }

  async loadClientes(): Promise<void> {
    try {
      this.clientes = await this.supabaseService.getAllClientes();
    } catch (error) {
      console.error('Error loading clients', error);
    }
  }

  async loadCuentas(): Promise<void> {
    try {
      this.cuentas = await this.supabaseService.getAllCuentas();
    } catch (error) {
      console.error('Error loading accounts', error);
    }
  }

  generateCardNumber(): string {
    const prefix = '4000';
    const randomDigits = () => Math.floor(100000000000 + Math.random() * 900000000000).toString();
    return `${prefix}${randomDigits()}`;
  }

  onClientChange(): void {
    const clientId = this.creditCardForm.get('clientId')?.value;
    const selectedClient = this.clientes.find(client => client.id === clientId);
    if (selectedClient) {
      this.creditCardForm.patchValue({
        cardHolderName: selectedClient.name
      });
      this.filteredCuentas = this.cuentas.filter(cuenta => cuenta.client_id === clientId); // Filtrar las cuentas por clientId
    }
  }

  async onSubmit(): Promise<void> {
    if (this.creditCardForm.valid) {
      const { cardHolderName, expirationDate, securityCode, cardType, pin, clientId, accountId } = this.creditCardForm.value;
      const cardNumber = this.generateCardNumber();
      const tarjeta: Omit<Tarjeta, 'id'> = {
        saldo: 0,
        cardNumber,
        cardHolderName,
        expirationDate,
        securityCode,
        cardType,
        PIN: pin,
        client_id: clientId,
        account_id: accountId
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
