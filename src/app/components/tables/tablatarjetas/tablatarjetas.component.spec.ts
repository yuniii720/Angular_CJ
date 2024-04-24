import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablatarjetasComponent } from './tablatarjetas.component';

describe('TablatarjetasComponent', () => {
  let component: TablatarjetasComponent;
  let fixture: ComponentFixture<TablatarjetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablatarjetasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablatarjetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
