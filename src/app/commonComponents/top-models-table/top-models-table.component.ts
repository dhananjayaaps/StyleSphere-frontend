import { Component, OnInit } from '@angular/core';
import {model, modelAdvanced, modelResponse, Statistics} from "../../domain/models";
import {Table, TableModule} from "primeng/table";
import {PrimeTemplate} from "primeng/api";
import {Button} from "primeng/button";
import {CurrencyPipe} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import * as http from "http";
import {HttpClient} from "@angular/common/http";
import * as url from "url";
import _default from "chart.js/dist/core/core.interaction";
import modes = _default.modes;
import {BASE_url} from "../../app.config";
import dataset = _default.modes.dataset;



@Component({
  selector: 'app-top-models-table',
  standalone: true,
  imports: [
    PrimeTemplate,
    Button,
    TableModule,
    CurrencyPipe,
    RatingModule,
    FormsModule
  ],
  templateUrl: './top-models-table.component.html',
  styleUrls: ['./top-models-table.component.css'],
})
export class TopModelsTableComponent implements OnInit {
  models!: modelAdvanced[];


    constructor(private http: HttpClient) { }



    ngOnInit() {
      this.http.get<modelResponse>(BASE_url+"/vebxrmodel/findWithFilters", { withCredentials: true })
        .subscribe({
          next: (response) => {

            // console.log(response.data)
            this.models = response.data;
          },
          error: (error:{error?:{massage?:string}}) => {
            console.error('There was an error!', error.error?.massage);
          }
        });

      // this.models = [
      //   {
      //     "id": 1000,
      //     "title": "Bamboo Watch",
      //     "image": "bamboo-watch.jpg",
      //     "format": "Accessories",
      //     "price": 65,
      //     "reviews": 5
      //   },
      //   {
      //     "id": 1001,
      //     "title": "Black Watch",
      //     "image": "black-watch.jpg",
      //     "format": "Accessories",
      //     "price": 72,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1002,
      //     "title": "Blue Band",
      //     "image": "blue-band.jpg",
      //     "format": "Fitness",
      //     "price": 79,
      //     "reviews": 3
      //   },
      //   {
      //     "id": 1003,
      //     "title": "Blue T-Shirt",
      //     "image": "blue-t-shirt.jpg",
      //     "format": "Clothing",
      //     "price": 29,
      //     "reviews": 5
      //   },
      //   {
      //     "id": 1004,
      //     "title": "Bracelet",
      //     "image": "bracelet.jpg",
      //     "format": "Accessories",
      //     "price": 15,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1005,
      //     "title": "Brown Purse",
      //     "image": "brown-purse.jpg",
      //     "format": "Accessories",
      //     "price": 120,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1006,
      //     "title": "Chakra Bracelet",
      //     "image": "chakra-bracelet.jpg",
      //     "format": "Accessories",
      //     "price": 32,
      //     "reviews": 3
      //   },
      //   {
      //     "id": 1007,
      //     "title": "Galaxy Earrings",
      //     "image": "galaxy-earrings.jpg",
      //     "format": "Accessories",
      //     "price": 34,
      //     "reviews": 5
      //   },
      //   {
      //     "id": 1008,
      //     "title": "Game Controller",
      //     "image": "game-controller.jpg",
      //     "format": "Electronics",
      //     "price": 99,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1009,
      //     "title": "Gaming Set",
      //     "image": "gaming-set.jpg",
      //     "format": "Electronics",
      //     "price": 299,
      //     "reviews": 3
      //   },
      //   {
      //     "id": 1010,
      //     "title": "Gold Phone Case",
      //     "image": "gold-phone-case.jpg",
      //     "format": "Accessories",
      //     "price": 24,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1011,
      //     "title": "Green Earbuds",
      //     "image": "green-earbuds.jpg",
      //     "format": "Electronics",
      //     "price": 89,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1012,
      //     "title": "Green T-Shirt",
      //     "image": "green-t-shirt.jpg",
      //     "format": "Clothing",
      //     "price": 49,
      //     "reviews": 5
      //   },
      //   {
      //     "id": 1013,
      //     "title": "Grey T-Shirt",
      //     "image": "grey-t-shirt.jpg",
      //     "format": "Clothing",
      //     "price": 48,
      //     "reviews": 3
      //   },
      //   {
      //     "id": 1014,
      //     "title": "Headphones",
      //     "image": "headphones.jpg",
      //     "format": "Electronics",
      //     "price": 175,
      //     "reviews": 5
      //   },
      //   {
      //     "id": 1015,
      //     "title": "Light Green T-Shirt",
      //     "image": "light-green-t-shirt.jpg",
      //     "format": "Clothing",
      //     "price": 49,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1016,
      //     "title": "Lime Band",
      //     "image": "lime-band.jpg",
      //     "format": "Fitness",
      //     "price": 79,
      //     "reviews": 3
      //   },
      //   {
      //     "id": 1017,
      //     "title": "Mini Speakers",
      //     "image": "mini-speakers.jpg",
      //     "format": "Electronics",
      //     "price": 85,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1018,
      //     "title": "Painted Phone Case",
      //     "image": "painted-phone-case.jpg",
      //     "format": "Accessories",
      //     "price": 56,
      //     "reviews": 5
      //   },
      //   {
      //     "id": 1019,
      //     "title": "Pink Band",
      //     "image": "pink-band.jpg",
      //     "format": "Fitness",
      //     "price": 79,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1020,
      //     "title": "Pink Purse",
      //     "image": "pink-purse.jpg",
      //     "format": "Accessories",
      //     "price": 110,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1021,
      //     "title": "Purple Band",
      //     "image": "purple-band.jpg",
      //     "format": "Fitness",
      //     "price": 79,
      //     "reviews": 3
      //   },
      //   {
      //     "id": 1022,
      //     "title": "Purple Gemstone Necklace",
      //     "image": "purple-gemstone-necklace.jpg",
      //     "format": "Accessories",
      //     "price": 45,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1023,
      //     "title": "Purple T-Shirt",
      //     "image": "purple-t-shirt.jpg",
      //     "format": "Clothing",
      //     "price": 49,
      //     "reviews": 5
      //   },
      //   {
      //     "id": 1024,
      //     "title": "Shoes",
      //     "image": "shoes.jpg",
      //     "format": "Clothing",
      //     "price": 64,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1025,
      //     "title": "Sneakers",
      //     "image": "sneakers.jpg",
      //     "format": "Clothing",
      //     "price": 78,
      //     "reviews": 4
      //   },
      //   {
      //     "id": 1026,
      //     "title": "Teal T-Shirt",
      //     "image": "teal-t-shirt.jpg",
      //     "format": "Clothing",
      //     "price": 49,
      //     "reviews": 3
      //   },
      //   {
      //     "id": 1027,
      //     "title": "Yellow Earbuds",
      //     "image": "yellow-earbuds.jpg",
      //     "format": "Electronics",
      //     "price": 89,
      //     "reviews": 3
      //   },
      //   {
      //     "id": 1028,
      //     "title": "Yoga Mat",
      //     "image": "yoga-mat.jpg",
      //     "format": "Fitness",
      //     "price": 20,
      //     "reviews": 5
      //   },
      //   {
      //     "id": 1029,
      //     "title": "Yoga Set",
      //     "image": "yoga-set.jpg",
      //     "format": "Fitness",
      //     "price": 20,
      //     "reviews": 4
      //   }
      // ];



      // console.log(this.models);
    }
//[
//     {
//         "day": "Saturday",
//         "value": 35.12
//     },
//     {
//         "day": "Sunday",
//         "value": 35.12
//     },
//     {
//         "day": "Monday",
//         "value": 35.12
//     },
//     {
//         "day": "Tuesday",
//         "value": 35.12
//     },
//     {
//         "day": "Wednesday",
//         "value": 35.12
//     },
//     {
//         "day": "Thursday",
//         "value": 35.12
//     }
// ]

    clear(table: Table) {
        table.clear();
    }


}
