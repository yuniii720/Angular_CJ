import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnModAccountComponent } from './btn-mod-account.component';

describe('BtnModAccountComponent', () => {
  let component: BtnModAccountComponent;
  let fixture: ComponentFixture<BtnModAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnModAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnModAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
