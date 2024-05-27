import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSaveAccountComponent } from './btn-save-account.component';

describe('BtnSaveAccountComponent', () => {
  let component: BtnSaveAccountComponent;
  let fixture: ComponentFixture<BtnSaveAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnSaveAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnSaveAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
