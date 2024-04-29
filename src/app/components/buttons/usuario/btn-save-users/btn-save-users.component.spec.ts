import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSaveUsersComponent } from './btn-save-users.component';

describe('BtnSaveUsersComponent', () => {
  let component: BtnSaveUsersComponent;
  let fixture: ComponentFixture<BtnSaveUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnSaveUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnSaveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
