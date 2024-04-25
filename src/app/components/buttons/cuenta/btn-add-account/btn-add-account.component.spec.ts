import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddAccountComponent } from './btn-add-account.component';

describe('BtnAddAcountComponent', () => {
  let component: BtnAddAccountComponent;
  let fixture: ComponentFixture<BtnAddAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnAddAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnAddAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
