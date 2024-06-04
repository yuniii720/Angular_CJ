import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelMovimientoComponent } from './del-movimiento.component';

describe('DelMovimientoComponent', () => {
  let component: DelMovimientoComponent;
  let fixture: ComponentFixture<DelMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelMovimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
