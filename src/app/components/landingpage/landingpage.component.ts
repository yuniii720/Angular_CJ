import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px",
      threshold: 0.5 // Ajusta este valor según necesites que la animación se dispare antes o después
    });

    // Selecciona todos los elementos que necesitas observar
    document.querySelectorAll('.contenedor').forEach(block => {
      observer.observe(block);
    });
  }
}

