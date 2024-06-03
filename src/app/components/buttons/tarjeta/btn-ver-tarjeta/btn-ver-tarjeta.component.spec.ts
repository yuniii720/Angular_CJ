import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnVerTarjetaComponent } from './btn-ver-tarjeta.component';

describe('BtnVerTarjetaComponent', () => {
  let component: BtnVerTarjetaComponent;
  let fixture: ComponentFixture<BtnVerTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnVerTarjetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnVerTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
