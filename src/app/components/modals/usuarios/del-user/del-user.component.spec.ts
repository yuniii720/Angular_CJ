import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelUserComponent } from './del-user.component';

describe('DelUserComponent', () => {
  let component: DelUserComponent;
  let fixture: ComponentFixture<DelUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
