import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euroCurrency'
})
export class EuroCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if (value !== null && value !== undefined) {
      // Formatea el número con dos decimales y agrega el símbolo del euro al final
      return value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    }
    return '';
  }

}
