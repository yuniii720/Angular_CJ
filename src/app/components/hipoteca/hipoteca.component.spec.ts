import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HipotecaComponent } from './hipoteca.component';

describe('HipotecaComponent', () => {
  let component: HipotecaComponent;
  let fixture: ComponentFixture<HipotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HipotecaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HipotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
