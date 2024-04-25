import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelCardComponent } from './del-card.component';

describe('DelCardComponent', () => {
  let component: DelCardComponent;
  let fixture: ComponentFixture<DelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
