import {Component, Input} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {CommonModule, NgClass} from "@angular/common";
import {data} from "autoprefixer";

@Component({
  selector: 'app-admin-card-with-chart',
  standalone: true,
  imports: [
    ChartModule,
    NgClass
  ],
  templateUrl: './admin-card-with-chart.component.html',
  styleUrl: './admin-card-with-chart.component.css'
})
export class AdminCardWithChartComponent {
  private _isHidden: boolean = false;
  hiddenState: string = '';
  css: string ='grid grid-cols-2';


  @Input() title: any;
  @Input()value: any;
  @Input()precentage: any;
  @Input()totalmodeldata: any;
  @Input()options: any;
  @Input()
  set isChartHidden(value: boolean) {
    this._isHidden = value;
    this.hiddenState = this._isHidden ? 'hidden' : '';
    this.css = this._isHidden ? 'flex justify-center' : 'grid grid-cols-2';
  }
  @Input() arrow: any;
  @Input()color: any;







}
