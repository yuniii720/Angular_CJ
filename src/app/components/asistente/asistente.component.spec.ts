import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenteComponent } from './asistente.component';

describe('AsistenteComponent', () => {
  let component: AsistenteComponent;
  let fixture: ComponentFixture<AsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenteComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show initial options', () => {
    component.showInitialOptions();
    const chatDisplay = fixture.nativeElement.querySelector('#chat-display');
    const initialOptions = chatDisplay.querySelectorAll('.option');
    expect(initialOptions.length).toBeGreaterThan(0);
  });

  it('should show related questions', () => {
    const option = 'tarjetas'; // Puedes cambiar esto para probar diferentes opciones
    component.showRelatedQuestions(option);
    const chatDisplay = fixture.nativeElement.querySelector('#chat-display');
    const questions = chatDisplay.querySelectorAll('.question');
    expect(questions.length).toBeGreaterThan(0);
  });

  it('should show answer', () => {
    const pregunta = { pregunta: '¿Cómo puedo solicitar una nueva tarjeta?', respuesta: 'Para solicitar una nueva tarjeta...' }; // Objeto de pregunta simulado
    component.showAnswer(pregunta);
    const chatDisplay = fixture.nativeElement.querySelector('#chat-display');
    const answer = chatDisplay.querySelector('.user-message');
    expect(answer).toBeTruthy();
  });

  it('should send user input', () => {
    component.sendUserInput();
    const chatDisplay = fixture.nativeElement.querySelector('#chat-display');
    const userMessage = chatDisplay.querySelector('.user-message');
    expect(userMessage).toBeTruthy();
  });

  it('should handle click event', () => {
    const toggleBtn = fixture.nativeElement.querySelector('#chatbot-toggle');
    toggleBtn.click();
    fixture.detectChanges();
    expect(component.isChatbotVisible).toBe(true); // Verifica que la visibilidad cambie a true al hacer clic
    toggleBtn.click();
    fixture.detectChanges();
    expect(component.isChatbotVisible).toBe(false); // Verifica que la visibilidad cambie a false al hacer clic nuevamente
  });
});
