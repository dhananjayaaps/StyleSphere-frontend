import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TableModule} from "primeng/table";
import {model2} from "../../domain/models";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {CurrencyPipe} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {BASE_url} from "../../app.config";

@Component({
  selector: 'app-models-by-user-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonDirective,
    Ripple,
    CurrencyPipe,
    RatingModule,
    FormsModule,
    DialogModule
  ],
  templateUrl: './models-by-user-table.component.html',
  styleUrl: './models-by-user-table.component.css'
})
export class ModelsByUserTableComponent implements OnInit{

  models!: model2[]
  selectedProduct: any;
  vix: any;

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    // this.models = [
    //   {
    //     "id": 1000,
    //     "name": "Bamboo Watch",
    //     "user": {"name": "Amy Elsner", "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"},
    //     "image": "bamboo-watch.jpg",
    //     "category": "Accessories",
    //     "price": 65,
    //     "reviews": 5
    //   },
    //   {
    //     "id": 1001,
    //     "name": "Black Watch",
    //     "user": {"name": "Anna Fali", "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png"},
    //     "image": "black-watch.jpg",
    //     "category": "Accessories",
    //     "price": 72,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1002,
    //     "name": "Blue Band",
    //     "user": {
    //       "name": "Asiya Javayant",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
    //     },
    //     "image": "blue-band.jpg",
    //     "category": "Fitness",
    //     "price": 79,
    //     "reviews": 3
    //   },
    //   {
    //     "id": 1003,
    //     "name": "Blue T-Shirt",
    //     "user": {
    //       "name": "Bernardo Dominic",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/bernardodominic.png"
    //     },
    //     "image": "blue-t-shirt.jpg",
    //     "category": "Clothing",
    //     "price": 29,
    //     "reviews": 5
    //   },
    //   {
    //     "id": 1004,
    //     "name": "Bracelet",
    //     "user": {
    //       "name": "Elwin Sharvill",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png"
    //     },
    //     "image": "bracelet.jpg",
    //     "category": "Accessories",
    //     "price": 15,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1005,
    //     "name": "Brown Purse",
    //     "user": {
    //       "name": "Ioni Bowcher",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png"
    //     },
    //     "image": "brown-purse.jpg",
    //     "category": "Accessories",
    //     "price": 120,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1006,
    //     "name": "Chakra Bracelet",
    //     "user": {
    //       "name": "Ivan Magalhaes",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ivanmagalhaes.png"
    //     },
    //     "image": "chakra-bracelet.jpg",
    //     "category": "Accessories",
    //     "price": 32,
    //     "reviews": 3
    //   },
    //   {
    //     "id": 1007,
    //     "name": "Galaxy Earrings",
    //     "user": {
    //       "name": "Onyama Limba",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png"
    //     },
    //     "image": "galaxy-earrings.jpg",
    //     "category": "Accessories",
    //     "price": 34,
    //     "reviews": 5
    //   },
    //   {
    //     "id": 1008,
    //     "name": "Game Controller",
    //     "user": {
    //       "name": "Stephen Shaw",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png"
    //     },
    //     "image": "game-controller.jpg",
    //     "category": "Electronics",
    //     "price": 99,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1009,
    //     "name": "Gaming Set",
    //     "user": {"name": "Xuxue Feng", "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png"},
    //     "image": "gaming-set.jpg",
    //     "category": "Electronics",
    //     "price": 299,
    //     "reviews": 3
    //   },
    //   {
    //     "id": 1010,
    //     "name": "Gold Phone Case",
    //     "user": {"name": "Amy Elsner", "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"},
    //     "image": "gold-phone-case.jpg",
    //     "category": "Accessories",
    //     "price": 24,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1011,
    //     "name": "Green Earbuds",
    //     "user": {"name": "Anna Fali", "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png"},
    //     "image": "green-earbuds.jpg",
    //     "category": "Electronics",
    //     "price": 89,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1012,
    //     "name": "Green T-Shirt",
    //     "user": {
    //       "name": "Asiya Javayant",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
    //     },
    //     "image": "green-t-shirt.jpg",
    //     "category": "Clothing",
    //     "price": 49,
    //     "reviews": 5
    //   },
    //   {
    //     "id": 1013,
    //     "name": "Grey T-Shirt",
    //     "user": {
    //       "name": "Bernardo Dominic",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/bernardodominic.png"
    //     },
    //     "image": "grey-t-shirt.jpg",
    //     "category": "Clothing",
    //     "price": 48,
    //     "reviews": 3
    //   },
    //   {
    //     "id": 1014,
    //     "name": "Headphones",
    //     "user": {
    //       "name": "Elwin Sharvill",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/elwinsharvill.png"
    //     },
    //     "image": "headphones.jpg",
    //     "category": "Electronics",
    //     "price": 175,
    //     "reviews": 5
    //   },
    //   {
    //     "id": 1015,
    //     "name": "Light Green T-Shirt",
    //     "user": {
    //       "name": "Ioni Bowcher",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png"
    //     },
    //     "image": "light-green-t-shirt.jpg",
    //     "category": "Clothing",
    //     "price": 49,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1016,
    //     "name": "Lime Band",
    //     "user": {
    //       "name": "Ivan Magalhaes",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/ivanmagalhaes.png"
    //     },
    //     "image": "lime-band.jpg",
    //     "category": "Fitness",
    //     "price": 79,
    //     "reviews": 3
    //   },
    //   {
    //     "id": 1017,
    //     "name": "Mini Speakers",
    //     "user": {
    //       "name": "Onyama Limba",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png"
    //     },
    //     "image": "mini-speakers.jpg",
    //     "category": "Electronics",
    //     "price": 85,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1018,
    //     "name": "Painted Phone Case",
    //     "user": {
    //       "name": "Stephen Shaw",
    //       "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png"
    //     },
    //     "image": "painted-phone-case.jpg",
    //     "category": "Accessories",
    //     "price": 56,
    //     "reviews": 5
    //   },
    //   {
    //     "id": 1019,
    //     "name": "Pink Band",
    //     "user": {"name": "Xuxue Feng", "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png"},
    //     "image": "pink-band.jpg",
    //     "category": "Fitness",
    //     "price": 79,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1020,
    //     "name": "Pink Purse",
    //     "user": {"name": "Amy Elsner", "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"},
    //     "image": "pink-purse.jpg",
    //     "category": "Accessories",
    //     "price": 110,
    //     "reviews": 4
    //   },
    //   {
    //     "id": 1021,
    //     "name": "Purple Band",
    //     "user": {"name": "Anna Fali", "image": "https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png"},
    //     "image": "purple-band.jpg",
    //     "category": "Fitness",
    //     "price": 79,
    //     "reviews": 3
    //   }
    // ]

    this.http.get<model2[]>(BASE_url+"/vebxrmodel/modelsWithSellers",{withCredentials:true}).subscribe({
        next:(res)=>{
          this.models=res;
        },
        error:(e)=>{
            e.status
        },

      }
    )

  }
  calculateCustomerTotal(name: string) {
    let total = 0;

    if (this.models) {
      for (let model of this.models) {
        if (model.user?.name === name) {
          total++;
        }
      }
    }

    return total;
  }

  @Output() rowSelected = new EventEmitter<any>();

  onRowSelect(event: any) {
    this.rowSelected.emit(event.data);
  }
}
