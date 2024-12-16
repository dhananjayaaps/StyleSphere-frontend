import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { BASE_url } from 'src/app/app.config';

@Component({
  selector: 'app-sales-by-category-pie-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './sales-by-category-pie-chart.component.html',
  styleUrls: ['./sales-by-category-pie-chart.component.css'],
})
export class SalesByCategoryPieChartComponent implements OnInit {
  data: any;
  options: any;

  totalModels: number = 0;
  totalLikes: number = 0;
  totalEarnings: number = 0;
  totalRejected: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchDataAndInitializeChart();
    }
  }

  fetchDataAndInitializeChart() {
    const endpointUrl = BASE_url + '/sellers/modelsDashboard';
    this.http.get<any>(endpointUrl, { withCredentials: true }).subscribe(
      (response) => {
        this.totalModels = response.totalModels;
        this.totalLikes = response.totalLikes;
        this.totalEarnings = response.totalEarnings;
        this.totalRejected = response.totalRejected;
        this.initializeChart(response.modelEarnings);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  

  initializeChart(modelEarnings: any[]) {
    const labels = modelEarnings.map((model) => model.modelName);
    const dataPoints = modelEarnings.map((model) => model.earnings);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: labels,
      datasets: [
        {
          data: dataPoints,
          backgroundColor: this.generateColors(dataPoints.length),
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }

  generateColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count; // Generate a range of hues
      colors.push(`hsl(${hue}, 70%, 50%)`); // HSL color
    }
    return colors;
  }
}
