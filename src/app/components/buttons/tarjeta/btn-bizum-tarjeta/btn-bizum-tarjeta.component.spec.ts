import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBizumTarjetaComponent } from './btn-bizum-tarjeta.component';

describe('BtnBizumTarjetaComponent', () => {
  let component: BtnBizumTarjetaComponent;
  let fixture: ComponentFixture<BtnBizumTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnBizumTarjetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnBizumTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
