import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProfileComponent } from './index-profile.component';

describe('IndexProfileComponent', () => {
  let component: IndexProfileComponent;
  let fixture: ComponentFixture<IndexProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
