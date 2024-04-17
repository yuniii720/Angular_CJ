import { Component } from '@angular/core';

@Component({
  selector: 'app-botonestabla',
  template: `
    <div class="button-container">
      <button type="button" class="button-4">
        <img src="../../assets/img/editar.svg" alt="Editar">
      </button>
      <button type="button" class="button-4">
        <img src="../../assets/img/borrar.svg" alt="Borrar">
      </button>
    </div>
   `,
  styleUrl: './botonestabla.component.css',
})
export class BotonestablaComponent {
  
}
