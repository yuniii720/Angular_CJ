import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDelTransferComponent } from './btn-del-transfer.component';

describe('BtnDelTransferComponent', () => {
  let component: BtnDelTransferComponent;
  let fixture: ComponentFixture<BtnDelTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnDelTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnDelTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
