import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelAccountComponent } from './del-account.component';

describe('DelAccountComponent', () => {
  let component: DelAccountComponent;
  let fixture: ComponentFixture<DelAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
