import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnModUserComponent } from './btn-mod-user.component';

describe('BtnModUserComponent', () => {
  let component: BtnModUserComponent;
  let fixture: ComponentFixture<BtnModUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnModUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnModUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
