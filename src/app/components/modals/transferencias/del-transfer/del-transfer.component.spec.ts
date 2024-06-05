import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelTransferComponent } from './del-transfer.component';

describe('DelTransferComponent', () => {
  let component: DelTransferComponent;
  let fixture: ComponentFixture<DelTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
