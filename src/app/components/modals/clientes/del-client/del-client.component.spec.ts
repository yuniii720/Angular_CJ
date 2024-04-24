import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelClientComponent } from './del-client.component';

describe('DelClientComponent', () => {
  let component: DelClientComponent;
  let fixture: ComponentFixture<DelClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
