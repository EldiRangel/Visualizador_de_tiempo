import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDia } from './barra-dia';

describe('BarraDia', () => {
  let component: BarraDia;
  let fixture: ComponentFixture<BarraDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraDia],
    }).compileComponents();

    fixture = TestBed.createComponent(BarraDia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
