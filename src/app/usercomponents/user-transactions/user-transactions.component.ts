import { Component } from '@angular/core';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { UserProfileHeaderComponent } from '../user-profile-header/user-profile-header.component';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { WeeklyRevenueChartComponent } from "../../commonComponents/weekly-revenue-chart/weekly-revenue-chart.component";
import { SalesByCategoryPieChartComponent } from "../../commonComponents/sales-by-category-pie-chart/sales-by-category-pie-chart.component";
import { HttpClient } from '@angular/common/http';
import { BASE_url } from 'src/app/app.config';
import { Router } from '@angular/router';
import {SellerNavbarComponent} from "../seller-navbar/seller-navbar.component";

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

interface Model {
  id: number;
  title: string;
  image1Url: string;
  name: string;
  price: number;
  review: number;
  likesCount: number;
}

interface DailyEarnings {
  date: string;
  earnings: number;
}

interface ModelEarnings {
  modelId: number;
  modelName: string;
  earnings: number;
}

interface WithdrawalDetails {
  balance: number;
  pendingWithdrawals: number;
  totalWithdrawals: number;
  pastWithdrawals: {
    id: number;
    amount: number;
    status: string;
    stripeTransactionId: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
}
@Component({
  selector: 'app-user-transactions',
  standalone: true,
  imports: [
    CommonModule,
    UserNavbarComponent,
    FooterComponent,
    TabViewModule,
    ButtonModule,
    UserProfileHeaderComponent,
    PaginatorModule,
    ChartModule,
    WeeklyRevenueChartComponent,
    SalesByCategoryPieChartComponent,
    SellerNavbarComponent,
  ],
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.css'],
})
export class UserTransactionsComponent {
  first: number = 0;
  rows: number = 8;

  balance: number = 0;
  pendingWithdrawals: number = 0;
  totalWithdrawals: number = 0;
  pastWithdrawals: any[] = [];
  withdrawalAmount: number = 20;

  totalModels: number = 0;
  totalLikes: number = 0;
  totalEarnings: number = 0;
  totalRejected: number = 0;
  dailyEarnings: DailyEarnings[] = [];
  modelEarnings: ModelEarnings[] = [];

  models: Model[] = []
  //   {
  //     image:
  //       'https://media.sketchfab.com/models/dda567d1ffbd40eabbce7625a48a39ef/thumbnails/84f3614735f048b5838b45f5eb5aa430/01ec6878522a49bc956f9ba4b9fe08f8.jpeg',
  //     name: 'Elephant',
  //     price: '$2.99',
  //   },
  // ];
  paginatedModels: Model[] = [];
  totalModelRecords: number = this.models.length;

  totalmodeldata: any = { labels: [], datasets: [] };
  options: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.updatePaginatedModels();
    this.fetchWithdrawalDetails();
    this.fetchAccountDetails();
    this.initializeChartOptions();
    this.getAllmyModels();
  }

  onModelPageChange(event: PageEvent) {
    this.first = event.first || 0;
    this.rows = event.rows || 4;
    this.updatePaginatedModels();
  }

  updatePaginatedModels() {
    this.paginatedModels = this.models.slice(
      this.first,
      this.first + this.rows
    );
  }

  fetchWithdrawalDetails() {
    this.http
      .get<WithdrawalDetails>(
        'http://localhost:3000/transactions/withdrawal-details',
        { withCredentials: true }
      )
      .subscribe(
        (response) => {
          this.balance = response.balance;
          this.pendingWithdrawals = response.pendingWithdrawals;
          this.totalWithdrawals = response.totalWithdrawals;
          this.pastWithdrawals = response.pastWithdrawals;
        },
        (error) => {
          console.error('Error fetching withdrawal details:', error);
        }
      );
  }

  validateAmount() {
    if (this.withdrawalAmount < 21) {
      console.error('Withdrawal amount must be at least 21.');
    }
  }

  makeWithdrawal() {
    if (this.withdrawalAmount >= 20 && this.withdrawalAmount <= this.balance) {
      this.http
        .post(
          'http://localhost:3000/transactions/withdraw',
          { amount: this.withdrawalAmount },
          { withCredentials: true }
        )
        .subscribe(
          (response: any) => {
            console.log('Withdrawal successful:', response);
            this.fetchWithdrawalDetails();
          },
          (error) => {
            console.error('Error making withdrawal:', error);
          }
        );
    } else {
      console.error('Invalid withdrawal amount.');
    }
  }

  fetchAccountDetails() {
    this.http
      .get<{
        totalModels: number;
        totalLikes: number;
        totalEarnings: number;
        dailyEarnings: DailyEarnings[];
        totalRejected: number;
        modelEarnings: ModelEarnings[];
      }>('http://localhost:3000/sellers/modelsDashboard', { withCredentials: true })
      .subscribe(
        (response) => {
          this.totalModels = response.totalModels;
          this.totalLikes = response.totalLikes;
          this.totalEarnings = response.totalEarnings;
          this.totalRejected = response.totalRejected;
          this.dailyEarnings = response.dailyEarnings;
          this.modelEarnings = response.modelEarnings;

          this.updateChartData();
        },
        (error) => {
          console.error('Error fetching account details:', error);
        }
      );
  }

  getAllmyModels() {
    this.http
      .get<Model[]>(BASE_url+'/sellers/mymodels', {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          this.models = response;
          this.totalModelRecords = this.models.length;
          this.updatePaginatedModels();
        },
        (error) => {
          console.error('Error fetching models:', error);
        }
      );
  }

  initializeChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.options = {
      maintainAspectRatio: true,
      aspectRatio: 0.6,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { ticks: { display: false }, grid: { display: false } },
        y: { ticks: { display: false }, grid: { display: false } },
      },
    };
  }

  updateChartData() {
    const labels = this.dailyEarnings.map((entry) =>
      new Date(entry.date).toLocaleDateString()
    );
    const data = this.dailyEarnings.map((entry) => entry.earnings);

    this.totalmodeldata = {
      labels,
      datasets: [
        {
          data,
          borderColor: '#FF6384',
          tension: 0.5,
          fill: false,
        },
      ],
    };
  }

  onUploadModelClick() {
    this.router.navigate(['/upload-form']);
  }


}
