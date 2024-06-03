import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeCardComponent } from './see-card.component';

describe('SeeCardComponent', () => {
  let component: SeeCardComponent;
  let fixture: ComponentFixture<SeeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeeCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
