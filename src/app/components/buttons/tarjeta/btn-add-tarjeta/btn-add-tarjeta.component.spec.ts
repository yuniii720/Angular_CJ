import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddTarjetaComponent } from './btn-add-tarjeta.component';

describe('BtnAddTarjetaComponent', () => {
  let component: BtnAddTarjetaComponent;
  let fixture: ComponentFixture<BtnAddTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnAddTarjetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnAddTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
