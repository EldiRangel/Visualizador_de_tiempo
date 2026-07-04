import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CicloLunar } from './ciclo-lunar';

describe('CicloLunar', () => {
  let component: CicloLunar;
  let fixture: ComponentFixture<CicloLunar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CicloLunar],
    }).compileComponents();

    fixture = TestBed.createComponent(CicloLunar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
