import { CommonModule } from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import {RevenueStats, Statistics} from "../../domain/models";
import {BASE_url} from "../../app.config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-weekly-revenue-chart',
  standalone: true,
  imports: [ChartModule,CommonModule],
  templateUrl: './weekly-revenue-chart.component.html',
  styleUrl: './weekly-revenue-chart.component.css'
})
export class WeeklyRevenueChartComponent implements OnInit {
  basicData: any;
  basicOptions: any;


  statistics!:Statistics;
  data!:number[]
  labels!:string[]



  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getStats()


  }



  getStats(){
    this.http.get<Statistics>(BASE_url+"/statistics", { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.statistics = response;

          console.log(this.statistics)
          this.data = this.statistics.lastWeekRevenue?.map((value)=>value.value)||[];
          this.labels = this.statistics.lastWeekRevenue?.map((value)=>value.day)||[];

          console.log(this.statistics.lastMonthRevenue.at(0)?.totalRevenue)
          this.graphData()

        },
        error: (error:{error?:{massage?:string}}) => {
          console.error('There was an error!', error.error?.massage);
        }
      });
  }
  graphData() {

    if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
      const documentStyle = getComputedStyle(document.documentElement);
      // const textColor = documentStyle.getPropertyValue('--metawhite');
      // const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      // const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicData = {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: 'rgb(110,14,150)',
            borderWidth: 0,
            borderRadius: Number.MAX_VALUE,
            borderSkipped: false,
            tension: 0.4,
            barThickness: 30
          }
        ]
      };

      let delayed: boolean;
      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              // color: textColor
            },
            display: false
          }
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number; }) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'rgb(110,14,150)',
              stepSize: 200
            },
            grid: {
              // color: surfaceBorder,
              // drawBorder: false,
              display: false
            },
            border:{
              display: false
            }
          },
          x: {
            ticks: {
              color: 'rgb(110,14,150)'
            },
            grid: {
              // color: surfaceBorder,
              // drawBorder: false,
              display: false
            },
            border:{
              display: false
            }
          },
          display: false
        }
      };
    }
  }
}
