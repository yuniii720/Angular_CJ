import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDelUserComponent } from './btn-del-user.component';

describe('BtnDelUserComponent', () => {
  let component: BtnDelUserComponent;
  let fixture: ComponentFixture<BtnDelUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnDelUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnDelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
