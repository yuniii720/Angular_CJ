import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDelAccountComponent } from './btn-del-account.component';

describe('BtnDelAccountComponent', () => {
  let component: BtnDelAccountComponent;
  let fixture: ComponentFixture<BtnDelAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnDelAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnDelAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
