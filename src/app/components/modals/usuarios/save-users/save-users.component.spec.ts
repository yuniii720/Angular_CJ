import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveUsersComponent } from './save-users.component';

describe('SaveUsersComponent', () => {
  let component: SaveUsersComponent;
  let fixture: ComponentFixture<SaveUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
