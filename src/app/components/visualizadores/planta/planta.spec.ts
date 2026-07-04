import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Planta } from './planta';

describe('Planta', () => {
  let component: Planta;
  let fixture: ComponentFixture<Planta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Planta],
    }).compileComponents();

    fixture = TestBed.createComponent(Planta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
