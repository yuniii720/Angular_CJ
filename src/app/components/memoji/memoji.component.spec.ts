import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemojiComponent } from './memoji.component';

describe('MemojiComponent', () => {
  let component: MemojiComponent;
  let fixture: ComponentFixture<MemojiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemojiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemojiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
