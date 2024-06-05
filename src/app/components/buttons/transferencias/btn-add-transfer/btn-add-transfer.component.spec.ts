import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddTransferComponent } from './btn-add-transfer.component';

describe('BtnAddTransferComponent', () => {
  let component: BtnAddTransferComponent;
  let fixture: ComponentFixture<BtnAddTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnAddTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnAddTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
