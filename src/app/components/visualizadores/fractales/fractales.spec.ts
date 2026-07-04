import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fractales } from './fractales';

describe('Fractales', () => {
  let component: Fractales;
  let fixture: ComponentFixture<Fractales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fractales],
    }).compileComponents();

    fixture = TestBed.createComponent(Fractales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
