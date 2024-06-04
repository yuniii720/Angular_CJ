import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddMovimientoComponent } from './btn-add-movimiento.component';

describe('BtnAddMovimientoComponent', () => {
  let component: BtnAddMovimientoComponent;
  let fixture: ComponentFixture<BtnAddMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnAddMovimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnAddMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
