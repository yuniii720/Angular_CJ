import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablaUsuariosComponent } from './tablausuarios.component';

describe('TablausuariosComponent', () => {
  let component: TablaUsuariosComponent; 
  let fixture: ComponentFixture<TablaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
