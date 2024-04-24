import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnModClientComponent } from './btn-mod-client.component';

describe('BtnModClientComponent', () => {
  let component: BtnModClientComponent;
  let fixture: ComponentFixture<BtnModClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnModClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnModClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
