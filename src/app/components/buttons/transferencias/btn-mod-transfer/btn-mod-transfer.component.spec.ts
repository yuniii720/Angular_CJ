import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnModTransferComponent } from './btn-mod-transfer.component';

describe('BtnModTransferComponent', () => {
  let component: BtnModTransferComponent;
  let fixture: ComponentFixture<BtnModTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnModTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnModTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
