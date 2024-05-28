import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveClientsComponent } from './save-clients.component';

describe('SaveClientsComponent', () => {
  let component: SaveClientsComponent;
  let fixture: ComponentFixture<SaveClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
