import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModMovimientoComponent } from './mod-movimiento.component';

describe('ModMovimientoComponent', () => {
  let component: ModMovimientoComponent;
  let fixture: ComponentFixture<ModMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModMovimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
