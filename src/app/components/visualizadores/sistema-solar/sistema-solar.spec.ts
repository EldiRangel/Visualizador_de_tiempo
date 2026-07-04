import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaSolar } from './sistema-solar';

describe('SistemaSolar', () => {
  let component: SistemaSolar;
  let fixture: ComponentFixture<SistemaSolar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemaSolar],
    }).compileComponents();

    fixture = TestBed.createComponent(SistemaSolar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
