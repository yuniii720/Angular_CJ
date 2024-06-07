import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevertTransferComponent } from './revert-transfer.component';

describe('RevertTransferComponent', () => {
  let component: RevertTransferComponent;
  let fixture: ComponentFixture<RevertTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevertTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevertTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
