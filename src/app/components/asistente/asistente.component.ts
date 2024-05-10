import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistente',
  templateUrl: './asistente.component.html',
  styleUrls: ['./asistente.component.css']
})
export class AsistenteComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Lógica de inicialización
  }

  showInitialOptions() {
    // Método para mostrar opciones iniciales
  }

  showRelatedQuestions(option: string) {
    // Método para mostrar preguntas relacionadas
  }

  showAnswer(pregunta: any) {
    // Método para mostrar respuesta
  }

  sendUserInput() {
    // Método para enviar la entrada del usuario
  }
}
