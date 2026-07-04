import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vela } from './vela';

describe('Vela', () => {
  let component: Vela;
  let fixture: ComponentFixture<Vela>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vela],
    }).compileComponents();

    fixture = TestBed.createComponent(Vela);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
