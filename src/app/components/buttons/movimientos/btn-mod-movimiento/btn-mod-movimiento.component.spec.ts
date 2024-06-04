import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnModMovimientoComponent } from './btn-mod-movimiento.component';

describe('BtnModMovimientoComponent', () => {
  let component: BtnModMovimientoComponent;
  let fixture: ComponentFixture<BtnModMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnModMovimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnModMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
