import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByCategoryPieChartComponent } from './sales-by-category-pie-chart.component';

describe('SalesByCategoryPieChartComponent', () => {
  let component: SalesByCategoryPieChartComponent;
  let fixture: ComponentFixture<SalesByCategoryPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesByCategoryPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesByCategoryPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
