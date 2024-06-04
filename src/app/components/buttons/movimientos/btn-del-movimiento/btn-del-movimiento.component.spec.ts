import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDelMovimientoComponent } from './btn-del-movimiento.component';

describe('BtnDelMovimientoComponent', () => {
  let component: BtnDelMovimientoComponent;
  let fixture: ComponentFixture<BtnDelMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnDelMovimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnDelMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
