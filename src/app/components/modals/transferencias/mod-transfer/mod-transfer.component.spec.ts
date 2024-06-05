import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModTransferComponent } from './mod-transfer.component';

describe('ModTransferComponent', () => {
  let component: ModTransferComponent;
  let fixture: ComponentFixture<ModTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
