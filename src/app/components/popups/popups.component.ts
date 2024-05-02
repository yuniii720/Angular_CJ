import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.css']
})
export class PopupsComponent implements OnInit {
  @Input() title: string = ''; // Propiedad de entrada para el título

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Aquí puedes hacer cualquier inicialización adicional si es necesario
  }

  mostrarPopup(): void {
    const capaT = document.querySelector('.capaT') as HTMLElement;
    const info1 = document.querySelector('.info1') as HTMLElement;

    if (capaT && info1) {
      capaT.style.display = 'flex';
      info1.style.display = 'flex';
      capaT.classList.add('mostrar');
      info1.classList.add('mostrar');

      // Asignar el título proporcionado
      this.cdr.detectChanges();

      // Cerrar el popup después de 0.5 segundos
      setTimeout(() => {
        this.cerrarPopup();
      }, 2100);
    }
  }

  cerrarPopup(): void {
    const capaT = document.querySelector('.capaT') as HTMLElement;
    const info1 = document.querySelector('.info1') as HTMLElement;
    if (capaT && info1) {
      capaT.classList.remove('mostrar');
      info1.classList.remove('mostrar');
      info1.classList.add('ocultar');
      setTimeout(() => {
        capaT.style.display = 'none';
        info1.style.display = 'none';
        info1.classList.remove('ocultar');
      }, 500);
    }
  }
}
