import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCardWithChartComponent } from './admin-card-with-chart.component';

describe('AdminCardWithChartComponent', () => {
  let component: AdminCardWithChartComponent;
  let fixture: ComponentFixture<AdminCardWithChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCardWithChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCardWithChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
