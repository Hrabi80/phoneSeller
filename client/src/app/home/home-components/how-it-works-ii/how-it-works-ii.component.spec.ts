import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItWorksIiComponent } from './how-it-works-ii.component';

describe('HowItWorksIiComponent', () => {
  let component: HowItWorksIiComponent;
  let fixture: ComponentFixture<HowItWorksIiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowItWorksIiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowItWorksIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
