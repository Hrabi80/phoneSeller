import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerTestComponent } from './messenger-test.component';

describe('MessengerTestComponent', () => {
  let component: MessengerTestComponent;
  let fixture: ComponentFixture<MessengerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
