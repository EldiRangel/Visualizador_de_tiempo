import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clepsidra } from './clepsidra';

describe('Clepsidra', () => {
  let component: Clepsidra;
  let fixture: ComponentFixture<Clepsidra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clepsidra],
    }).compileComponents();

    fixture = TestBed.createComponent(Clepsidra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
