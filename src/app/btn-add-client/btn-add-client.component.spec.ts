import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddClientComponent } from './btn-add-client.component';

describe('BtnAddClientComponent', () => {
  let component: BtnAddClientComponent;
  let fixture: ComponentFixture<BtnAddClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnAddClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnAddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
