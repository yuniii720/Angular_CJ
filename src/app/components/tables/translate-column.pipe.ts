import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateColumn'
})
export class TranslateColumnPipe implements PipeTransform {
  transform(value: string): string {
    const translations: { [key: string]: string } = {
      'id': 'ID',
      'username': 'Usuario',
      'name': 'Nombre',
      'email': 'Correo electrónico',
      'type': 'Tipo',
      'hire_date': 'Fecha de Alta',
      'created_at': 'Fecha de Registro',
      'gestionar': 'Gestionar',
      'dni': 'DNI',
      'city': 'Ciudad',
      'birth_date': 'Fecha de Nacimiento',
      'phone': 'Teléfono',
      'account_number': 'Número de Cuenta',
      'clientName': 'Nombre del Cliente',
      'balance': 'Saldo',
      'cardHolderName': 'Titular de la Tarjeta',
      'cardNumber': 'Número de Tarjeta',
      'cardType': 'Tipo de Tarjeta',
      'saldo': 'Saldo',
      'expirationDate': 'Fecha de Expiración',
      'securityCode': 'Código de Seguridad',
      'pin': 'PIN',
    };
    return translations[value] || value;
  }
}
