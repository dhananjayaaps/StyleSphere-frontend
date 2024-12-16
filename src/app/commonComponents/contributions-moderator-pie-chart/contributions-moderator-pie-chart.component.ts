import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import {moderatorContributions} from "../../domain/models";

@Component({
  selector: 'app-contributions-moderator-pie-chart',
  standalone: true,
    imports: [
        ChartModule
    ],
  templateUrl: './contributions-moderator-pie-chart.component.html',
  styleUrl: './contributions-moderator-pie-chart.component.css'
})
export class ContributionsModeratorPieChartComponent  implements OnInit {
  data: any;
  options: any;
  @Input()
  dataset: moderatorContributions[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {

    let dataarray = this.dataset.map((item) => item.count);
    let labels = this.dataset.map((item) => item.firstName);



    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data = {
        labels: labels,
        datasets: [
          {
            data: dataarray,
            backgroundColor: [
              'rgb(65,12,76)', 'rgb(75,12,101)', 'rgb(88,15,118)', 'rgb(100,18,135)', 'rgb(110,21,150)',
              'rgb(120,24,165)', 'rgb(130,27,180)', 'rgb(140,30,195)', 'rgb(150,33,210)', 'rgb(160,36,225)',
              'rgb(170,39,240)', 'rgb(180,42,255)', 'rgb(190,45,270)', 'rgb(200,48,285)', 'rgb(210,51,300)',
              'rgb(220,54,315)'
            ]
          }
        ]
      };

      this.options = {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
    }
  }
}

