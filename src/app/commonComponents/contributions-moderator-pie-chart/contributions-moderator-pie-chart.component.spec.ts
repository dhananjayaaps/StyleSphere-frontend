import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionsModeratorPieChartComponent } from './contributions-moderator-pie-chart.component';

describe('ContributionsModeratorPieChartComponent', () => {
  let component: ContributionsModeratorPieChartComponent;
  let fixture: ComponentFixture<ContributionsModeratorPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributionsModeratorPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionsModeratorPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
