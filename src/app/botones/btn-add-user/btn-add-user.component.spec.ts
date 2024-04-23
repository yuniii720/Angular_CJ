import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddUserComponent } from './btn-add-user.component';

describe('BtnAddUserComponent', () => {
  let component: BtnAddUserComponent;
  let fixture: ComponentFixture<BtnAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnAddUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
