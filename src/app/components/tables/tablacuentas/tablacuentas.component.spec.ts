import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablacuentasComponent } from './tablacuentas.component';

describe('TablacuentasComponent', () => {
  let component: TablacuentasComponent;
  let fixture: ComponentFixture<TablacuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablacuentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablacuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
