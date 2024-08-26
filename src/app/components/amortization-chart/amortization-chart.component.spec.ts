import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationChartComponent } from './amortization-chart.component';

describe('AmortizationChartComponent', () => {
  let component: AmortizationChartComponent;
  let fixture: ComponentFixture<AmortizationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmortizationChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmortizationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
