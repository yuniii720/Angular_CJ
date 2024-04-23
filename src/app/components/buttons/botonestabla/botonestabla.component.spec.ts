import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonestablaComponent } from './botonestabla.component';

describe('BotonestablaComponent', () => {
  let component: BotonestablaComponent;
  let fixture: ComponentFixture<BotonestablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotonestablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotonestablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
