import {Component, Input, input, OnInit} from '@angular/core';
import {customer} from "../../domain/models";
import {Table, TableModule} from "primeng/table";
import {CommonModule, CurrencyPipe, NgClass} from "@angular/common";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {BASE_url} from "../../app.config";


@Component({
  selector: 'app-table-admin-4-coloum',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    TagModule,
    NgClass,
    InputTextModule,
    InputIconModule,
    CurrencyPipe
  ],
  templateUrl: './table-admin-4-coloum.component.html',
  styleUrl: './table-admin-4-coloum.component.css'
})
export class TableAdmin4ColoumComponent implements OnInit{

  customers!: customer[]



  statuses!: any[];
  selectedStatus!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    // this.customers = [
    //     {
    //       "id": 1,
    //       "creator": {
    //         "name": "Amy Elsner",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
    //       },
    //       "invoice": 1001,
    //       "customer": {
    //         "name": "Anna Fali",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png"
    //       },
    //       "amount": 250.75,
    //       "status": "Paid"
    //     },
    //     {
    //       "id": 2,
    //       "creator": {
    //         "name": "Asiya Javayant",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
    //       },
    //       "invoice": 1002,
    //       "customer": {
    //         "name": "Bernardo Dominic",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/bernardodominic.png"
    //       },
    //       "amount": 175.50,
    //       "status": "Unpaid"
    //     },
    //     {
    //       "id": 3,
    //       "creator": {
    //         "name": "Elwin Sharvill",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png"
    //       },
    //       "invoice": 1003,
    //       "customer": {
    //         "name": "Ioni Bowcher",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png"
    //       },
    //       "amount": 300.00,
    //       "status": "Pending"
    //     },
    //     {
    //       "id": 4,
    //       "creator": {
    //         "name": "Ivan Magalhaes",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ivanmagalhaes.png"
    //       },
    //       "invoice": 1004,
    //       "customer": {
    //         "name": "Onyama Limba",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png"
    //       },
    //       "amount": 400.25,
    //       "status": "Paid"
    //     },
    //     {
    //       "id": 5,
    //       "creator": {
    //         "name": "Stephen Shaw",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png"
    //       },
    //       "invoice": 1005,
    //       "customer": {
    //         "name": "Xuxue Feng",
    //         "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png"
    //       },
    //       "amount": 120.50,
    //       "status": "Unpaid"
    //     },
    //   {
    //     "id": 1,
    //     "creator": {
    //       "name": "Amy Elsner",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
    //     },
    //     "invoice": 1001,
    //     "customer": {
    //       "name": "Anna Fali",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png"
    //     },
    //     "amount": 250.75,
    //     "status": "Paid"
    //   },
    //   {
    //     "id": 2,
    //     "creator": {
    //       "name": "Asiya Javayant",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
    //     },
    //     "invoice": 1002,
    //     "customer": {
    //       "name": "Bernardo Dominic",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/bernardodominic.png"
    //     },
    //     "amount": 175.50,
    //     "status": "Unpaid"
    //   },
    //   {
    //     "id": 3,
    //     "creator": {
    //       "name": "Elwin Sharvill",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png"
    //     },
    //     "invoice": 1003,
    //     "customer": {
    //       "name": "Ioni Bowcher",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png"
    //     },
    //     "amount": 300.00,
    //     "status": "Pending"
    //   },
    //   {
    //     "id": 4,
    //     "creator": {
    //       "name": "Ivan Magalhaes",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ivanmagalhaes.png"
    //     },
    //     "invoice": 1004,
    //     "customer": {
    //       "name": "Onyama Limba",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png"
    //     },
    //     "amount": 400.25,
    //     "status": "Refunded"
    //   },
    //   {
    //     "id": 5,
    //     "creator": {
    //       "name": "Stephen Shaw",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png"
    //     },
    //     "invoice": 1005,
    //     "customer": {
    //       "name": "Xuxue Feng",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png"
    //     },
    //     "amount": 120.50,
    //     "status": "Unpaid"
    //   },
    //   {
    //     "id": 6,
    //     "creator": {
    //       "name": "Anna Fali",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png"
    //     },
    //     "invoice": 1006,
    //     "customer": {
    //       "name": "Amy Elsner",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
    //     },
    //     "amount": 95.00,
    //     "status": "Paid"
    //   },
    //   {
    //     "id": 7,
    //     "creator": {
    //       "name": "Bernardo Dominic",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/bernardodominic.png"
    //     },
    //     "invoice": 1007,
    //     "customer": {
    //       "name": "Asiya Javayant",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
    //     },
    //     "amount": 250.00,
    //     "status": "Pending"
    //   },
    //   {
    //     "id": 8,
    //     "creator": {
    //       "name": "Ioni Bowcher",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png"
    //     },
    //     "invoice": 1008,
    //     "customer": {
    //       "name": "Elwin Sharvill",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png"
    //     },
    //     "amount": 300.00,
    //     "status": "Unpaid"
    //   },
    //   {
    //     "id": 9,
    //     "creator": {
    //       "name": "Onyama Limba",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png"
    //     },
    //     "invoice": 1009,
    //     "customer": {
    //       "name": "Ivan Magalhaes",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ivanmagalhaes.png"
    //     },
    //     "amount": 500.00,
    //     "status": "Refunded"
    //   },
    //   {
    //     "id": 10,
    //     "creator": {
    //       "name": "Xuxue Feng",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png"
    //     },
    //     "invoice": 1010,
    //     "customer": {
    //       "name": "Stephen Shaw",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png"
    //     },
    //     "amount": 150.00,
    //     "status": "Pending"
    //   }
    // ]
    // this.loading = false;
    this.fetchTransactions();


  }

  fetchTransactions(start='',end='') {
    // Build query params
    let queryParams: any = {};
    if (start) {
      queryParams['startDate'] = start;
    }
    if (end) {
      queryParams['endDate'] = end;
    }

    // Make HTTP request
    this.loading = true;
    this.http.get<any[]>(BASE_url + '/payment/transactions', {
      params: queryParams,
      withCredentials: true,
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.customers = res;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching transactions:', err);
      },
    });
  }
  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string):any {
    switch (status) {
      case 'Unpaid':
        return 'danger';

      case 'Paid':
        return 'success';

      case 'pending':
        return 'info';

      case 'Refunded':
        return 'warning';

      default:
        return 'warning';
    }
  }


}
