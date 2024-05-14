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
      'gestionar': 'Gestionar'
    };
    return translations[value] || value;
  }
}
