import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModClientComponent } from './mod-client.component';

describe('ModClientComponent', () => {
  let component: ModClientComponent;
  let fixture: ComponentFixture<ModClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
