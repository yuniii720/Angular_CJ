import { ComponentFixture, TestBed } from '@angular/core/testing';

// Cambia la importación para que coincida con el nombre exportado en el archivo del componente
import { TablaUsuariosComponent } from './tablausuarios.component';

describe('TablausuariosComponent', () => {
  let component: TablaUsuariosComponent; // Aquí también debes cambiar el nombre de la variable
  let fixture: ComponentFixture<TablaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
