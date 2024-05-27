import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainclienteComponent } from './maincliente.component';

describe('MainclienteComponent', () => {
  let component: MainclienteComponent;
  let fixture: ComponentFixture<MainclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainclienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
