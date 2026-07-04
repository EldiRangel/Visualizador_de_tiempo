import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizPixeles } from './matriz-pixeles';

describe('MatrizPixeles', () => {
  let component: MatrizPixeles;
  let fixture: ComponentFixture<MatrizPixeles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrizPixeles],
    }).compileComponents();

    fixture = TestBed.createComponent(MatrizPixeles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
