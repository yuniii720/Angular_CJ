import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDelTarjetaComponent } from './btn-del-tarjeta.component';

describe('BtnDelTarjetaComponent', () => {
  let component: BtnDelTarjetaComponent;
  let fixture: ComponentFixture<BtnDelTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnDelTarjetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnDelTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
