import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDelClientComponent } from './btn-del-client.component';

describe('BtnDelClientComponent', () => {
  let component: BtnDelClientComponent;
  let fixture: ComponentFixture<BtnDelClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnDelClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnDelClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
