import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.css']
})
export class PopupsComponent implements OnInit {
  mensajes = [
    { id: 1, titulo: 'Usuario registrado correctamente', duracion: 5000 },
    { id: 2, titulo: 'Fila eliminada correctamente', duracion: 5000 },
    { id: 3, titulo: 'Fila editada correctamente', duracion: 5000 },   
  ];
  mensaje: any;

  constructor() { }

  ngOnInit(): void {
   
  }

  mostrarPopup(id: number): void {
    this.mensaje = this.mensajes.find(m => m.id === id);

    if (this.mensaje) {
      const capaT = document.querySelector('.capaT') as HTMLElement;
      const info1 = document.querySelector('.info1') as HTMLElement;

      if (capaT && info1) {
        capaT.style.display = 'flex';
        info1.style.display = 'flex';
        capaT.classList.add('mostrar');
        info1.classList.add('mostrar');
        this.actualizarIcono(this.mensaje.id);
        setTimeout(() => {
          this.cerrarPopup();
        }, this.mensaje.duracion);
      }
    }
  }

  actualizarIcono(id: number): void {
    const infoIcon = document.querySelector('.info__icon') as HTMLElement;
    if (infoIcon) {
      // Aquí puedes añadir lógica para cargar el ícono basado en el ID
      // Por ahora, solo mostramos un texto de ejemplo
      infoIcon.innerText = 'Icono aquí';
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
