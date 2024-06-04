import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BizumCardComponent } from './bizum-card.component';

describe('BizumCardComponent', () => {
  let component: BizumCardComponent;
  let fixture: ComponentFixture<BizumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BizumCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BizumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
