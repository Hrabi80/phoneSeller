import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsPopupComponent } from './characteristics-popup.component';

describe('CharacteristicsPopupComponent', () => {
  let component: CharacteristicsPopupComponent;
  let fixture: ComponentFixture<CharacteristicsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacteristicsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacteristicsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
