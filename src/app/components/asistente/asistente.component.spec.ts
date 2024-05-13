import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsistenteComponent } from './asistente.component';

describe('AsistenteComponent', () => {
  let component: AsistenteComponent;
  let fixture: ComponentFixture<AsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsistenteComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isChatbotVisible to true by default', () => {
    expect(component.isChatbotVisible).toBeTrue();
  });

  it('should toggle isChatbotVisible when toggleChatbot() is called', () => {
    const initialValue = component.isChatbotVisible;
    component.toggleChatbot();
    expect(component.isChatbotVisible).toBe(!initialValue);
  });

  // Agrega más pruebas según sea necesario para cubrir otras funcionalidades del componente
});
