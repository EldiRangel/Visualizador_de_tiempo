import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pendulo } from './pendulo';

describe('Pendulo', () => {
  let component: Pendulo;
  let fixture: ComponentFixture<Pendulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pendulo],
    }).compileComponents();

    fixture = TestBed.createComponent(Pendulo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
