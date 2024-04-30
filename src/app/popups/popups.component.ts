import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.css']
})
export class PopupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // El código que se ejecutará cuando el componente se inicialice
    this.setupPopup();
  }

  setupPopup(): void {
    const mostrarPopupButton = document.getElementById('mostrarPopup');
    if (mostrarPopupButton) {
      mostrarPopupButton.addEventListener('click', () => {
        this.mostrarPopup();
      });
    }
  }

  mostrarPopup(): void {
    const capaT = document.querySelector('.capaT') as HTMLElement;
    const info1 = document.querySelector('.info1') as HTMLElement;
    if (capaT && info1) {
      capaT.style.display = 'flex';
      info1.style.display = 'flex';
      capaT.classList.add('mostrar');
      info1.classList.add('mostrar');
      setTimeout(() => {
        this.cerrarPopup();
      }, 5000);
    }
  }

  cerrarPopup(): void {
    const capaT = document.querySelector('.capaT') as HTMLElement;
    const info1 = document.querySelector('.info1') as HTMLElement;
    if (capaT && info1) {
      capaT.style.display = 'none';
      info1.style.display = 'none';
      capaT.classList.remove('mostrar');
      info1.classList.remove('mostrar');
    }
  }
}
