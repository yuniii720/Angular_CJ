import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModAccountComponent } from './mod-account.component';

describe('ModAccountComponent', () => {
  let component: ModAccountComponent;
  let fixture: ComponentFixture<ModAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
