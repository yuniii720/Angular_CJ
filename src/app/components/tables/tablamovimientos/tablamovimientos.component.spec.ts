import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablamovimientosComponent } from './tablamovimientos.component';

describe('TablamovimientosComponent', () => {
  let component: TablamovimientosComponent;
  let fixture: ComponentFixture<TablamovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablamovimientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablamovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
