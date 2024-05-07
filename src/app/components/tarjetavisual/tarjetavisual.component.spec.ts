import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetavisualComponent } from './tarjetavisual.component';

describe('TarjetavisualComponent', () => {
  let component: TarjetavisualComponent;
  let fixture: ComponentFixture<TarjetavisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TarjetavisualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetavisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
