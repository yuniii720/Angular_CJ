import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnRevertTransferComponent } from './btn-revert-transfer.component';

describe('BtnRevertTransferComponent', () => {
  let component: BtnRevertTransferComponent;
  let fixture: ComponentFixture<BtnRevertTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnRevertTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnRevertTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
