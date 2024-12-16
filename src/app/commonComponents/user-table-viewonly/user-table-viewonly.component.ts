import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {DropdownModule} from "primeng/dropdown";
import {PrimeTemplate} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {AdvanceUser, error} from "../../domain/models";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputIconModule} from "primeng/inputicon";
import {DialogModule} from "primeng/dialog";
import {Button} from "primeng/button";
import {BASE_url} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-user-table-viewonly',
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    PrimeTemplate,
    TableModule,
    TagModule,
    FormsModule
  ],
  templateUrl: './user-table-viewonly.component.html',
  styleUrl: './user-table-viewonly.component.css'
})
export class UserTableViewonlyComponent implements OnInit{
  @Input()
  customers!: AdvanceUser[]


  statuses!: any[];
  selectedStatus!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  selectedModel: AdvanceUser | undefined;
  visible: any;

  constructor(private http: HttpClient, private _toastService: ToastService) {
  }
  ngOnInit() {
    // this.customers =[
    //   {
    //     "id": 1,
    //     "user": {
    //       "name": "Amy Elsner",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
    //     },
    //     "email": "amy.elsner@example.com",
    //     "contact": "+1-202-555-0101",
    //     "status": "Active"
    //   },
    //   {
    //     "id": 2,
    //     "user": {
    //       "name": "Anna Fali",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png"
    //     },
    //     "email": "anna.fali@example.com",
    //     "contact": "+1-202-555-0102",
    //     "status": "Inactive"
    //   },
    //   {
    //     "id": 3,
    //     "user": {
    //       "name": "Asiya Javayant",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
    //     },
    //     "email": "asiya.javayant@example.com",
    //     "contact": "+1-202-555-0103",
    //     "status": "Active"
    //   },
    //   {
    //     "id": 4,
    //     "user": {
    //       "name": "Bernardo Dominic",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/bernardodominic.png"
    //     },
    //     "email": "bernardo.dominic@example.com",
    //     "contact": "+1-202-555-0104",
    //     "status": "Deleted"
    //   },
    //   {
    //     "id": 5,
    //     "user": {
    //       "name": "Elwin Sharvill",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png"
    //     },
    //     "email": "elwin.sharvill@example.com",
    //     "contact": "+1-202-555-0105",
    //     "status": "Active"
    //   },
    //   {
    //     "id": 6,
    //     "user": {
    //       "name": "Ioni Bowcher",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png"
    //     },
    //     "email": "ioni.bowcher@example.com",
    //     "contact": "+1-202-555-0106",
    //     "status": "Inactive"
    //   },
    //   {
    //     "id": 7,
    //     "user": {
    //       "name": "Ivan Magalhaes",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ivanmagalhaes.png"
    //     },
    //     "email": "ivan.magalhaes@example.com",
    //     "contact": "+1-202-555-0107",
    //     "status": "Active"
    //   },
    //   {
    //     "id": 8,
    //     "user": {
    //       "name": "Onyama Limba",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png"
    //     },
    //     "email": "onyama.limba@example.com",
    //     "contact": "+1-202-555-0108",
    //     "status": "Deleted"
    //   },
    //   {
    //     "id": 9,
    //     "user": {
    //       "name": "Stephen Shaw",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png"
    //     },
    //     "email": "stephen.shaw@example.com",
    //     "contact": "+1-202-555-0109",
    //     "status": "Active"
    //   },
    //   {
    //     "id": 10,
    //     "user": {
    //       "name": "Xuxue Feng",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png"
    //     },
    //     "email": "xuxue.feng@example.com",
    //     "contact": "+1-202-555-0110",
    //     "status": "Inactive"
    //   },
    //   {
    //     "id": 11,
    //     "user": {
    //       "name": "Amy Elsner",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
    //     },
    //     "email": "amy.elsner2@example.com",
    //     "contact": "+1-202-555-0111",
    //     "status": "Deleted"
    //   },
    //   {
    //     "id": 12,
    //     "user": {
    //       "name": "Anna Fali",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png"
    //     },
    //     "email": "anna.fali2@example.com",
    //     "contact": "+1-202-555-0112",
    //     "status": "Active"
    //   },
    //   {
    //     "id": 13,
    //     "user": {
    //       "name": "Asiya Javayant",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
    //     },
    //     "email": "asiya.javayant2@example.com",
    //     "contact": "+1-202-555-0113",
    //     "status": "Inactive"
    //   },
    //   {
    //     "id": 14,
    //     "user": {
    //       "name": "Bernardo Dominic",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/bernardodominic.png"
    //     },
    //     "email": "bernardo.dominic2@example.com",
    //     "contact": "+1-202-555-0114",
    //     "status": "Active"
    //   },
    //   {
    //     "id": 15,
    //     "user": {
    //       "name": "Elwin Sharvill",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png"
    //     },
    //     "email": "elwin.sharvill2@example.com",
    //     "contact": "+1-202-555-0115",
    //     "status": "Deleted"
    //   },
    //   {
    //     "id": 16,
    //     "user": {
    //       "name": "Ioni Bowcher",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png"
    //     },
    //     "email": "ioni.bowcher2@example.com",
    //     "contact": "+1-202-555-0116",
    //     "status": "Active"
    //   },
    //   {
    //     "id": 17,
    //     "user": {
    //       "name": "Ivan Magalhaes",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ivanmagalhaes.png"
    //     },
    //     "email": "ivan.magalhaes2@example.com",
    //     "contact": "+1-202-555-0117",
    //     "status": "Inactive"
    //   },
    //   {
    //     "id": 18,
    //     "user": {
    //       "name": "Onyama Limba",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png"
    //     },
    //     "email": "onyama.limba2@example.com",
    //     "contact": "+1-202-555-0118",
    //     "status": "Active"
    //   },
    //   {
    //     "id": 19,
    //     "user": {
    //       "name": "Stephen Shaw",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png"
    //     },
    //     "email": "stephen.shaw2@example.com",
    //     "contact": "+1-202-555-0119",
    //     "status": "Deleted"
    //   },
    //   {
    //     "id": 20,
    //     "user": {
    //       "name": "Xuxue Feng",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png"
    //     },
    //     "email": "xuxue.feng2@example.com",
    //     "contact": "+1-202-555-0120",
    //     "status": "Active"
    //   }
    // ]

    this.loading = false;



    this.statuses = [
      { label: 'active', value: 'active' },
      { label: 'inactive', value: 'inactive' },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string):any {
    switch (status) {
      case 'deleted':
        return 'danger';

      case 'active':
        return 'success';

      case 'inactive':
        return 'info';

      default:
        return 'warning';
    }
  }

  onRowSelect(event: any) {
    this.visible = true;
    this.selectedModel = event.data;
    console.log(event.data);
  }


  cancel() {
    this.visible = false;
  }





}
