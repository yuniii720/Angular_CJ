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
      'created_at': 'Fecha de Alta',
      'gestionar': 'Gestionar'
    };
    return translations[value] || value;
  }
}
