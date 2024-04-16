import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablausuariosComponent } from './tablausuarios.component';

describe('TablausuariosComponent', () => {
  let component: TablausuariosComponent;
  let fixture: ComponentFixture<TablausuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablausuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablausuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
