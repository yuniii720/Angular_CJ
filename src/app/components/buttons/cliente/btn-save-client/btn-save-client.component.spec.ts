import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSaveClientComponent } from './btn-save-client.component';

describe('BtnSaveClientComponent', () => {
  let component: BtnSaveClientComponent;
  let fixture: ComponentFixture<BtnSaveClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnSaveClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnSaveClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
