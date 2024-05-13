import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnModTarjetaComponent } from './btn-mod-tarjeta.component';

describe('BtnModTarjetaComponent', () => {
  let component: BtnModTarjetaComponent;
  let fixture: ComponentFixture<BtnModTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnModTarjetaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnModTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
