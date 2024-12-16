import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {RatingModule} from "primeng/rating";
import {Table, TableModule} from "primeng/table";
import {modelAdvanced, modelResponse} from "../../domain/models";
import {HttpClient} from "@angular/common/http";
import {BASE_url} from "../../app.config";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-mod-review-table',
  standalone: true,
  imports: [
    CurrencyPipe,
    PrimeTemplate,
    RatingModule,
    TableModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './mod-review-table.component.html',
  styleUrl: './mod-review-table.component.css'
})
export class ModReviewTableComponent implements OnInit {
  models!: any[];


  constructor(private http: HttpClient,private router: Router,private _toastservice:ToastService) {}



  ngOnInit() {
    this.http.get<any>(BASE_url+"/review-requests", { withCredentials: true })
      .subscribe({
        next: (response) => {

          // console.log(response.data)
         this.models = response;
        },
        error: (error:{error?:{massage?:string}}) => {
          console.error('There was an error!', error.error?.massage);
          this._toastservice.error(error.error?.massage||"Error")
        }
      });

    // this.models = [
    //   {
    //     "id": 1000,
    //     "title": "Bamboo Watch",
    //     "image1Url": "bamboo-watch.jpg",
    //     "format": "Accessories",
    //     "price": 65,
    //     "review": 5
    //   },
    //   {
    //     "id": 1001,
    //     "title": "Black Watch",
    //     "image1Url": "black-watch.jpg",
    //     "format": "Accessories",
    //     "price": 72,
    //     "review": 4
    //   },
    //   {
    //     "id": 1002,
    //     "title": "Blue Band",
    //     "image1Url": "blue-band.jpg",
    //     "format": "Fitness",
    //     "price": 79,
    //     "review": 3
    //   },
    //   {
    //     "id": 1003,
    //     "title": "Blue T-Shirt",
    //     "image1Url": "blue-t-shirt.jpg",
    //     "format": "Clothing",
    //     "price": 29,
    //     "review": 5
    //   },
    //   {
    //     "id": 1004,
    //     "title": "Bracelet",
    //     "image1Url": "bracelet.jpg",
    //     "format": "Accessories",
    //     "price": 15,
    //     "review": 4
    //   },
    //   {
    //     "id": 1005,
    //     "title": "Brown Purse",
    //     "image1Url": "brown-purse.jpg",
    //     "format": "Accessories",
    //     "price": 120,
    //     "review": 4
    //   },
    //   {
    //     "id": 1006,
    //     "title": "Chakra Bracelet",
    //     "image1Url": "chakra-bracelet.jpg",
    //     "format": "Accessories",
    //     "price": 32,
    //     "review": 3
    //   },
    //   {
    //     "id": 1007,
    //     "title": "Galaxy Earrings",
    //     "image1Url": "galaxy-earrings.jpg",
    //     "format": "Accessories",
    //     "price": 34,
    //     "review": 5
    //   },
    //   {
    //     "id": 1008,
    //     "title": "Game Controller",
    //     "image1Url": "game-controller.jpg",
    //     "format": "Electronics",
    //     "price": 99,
    //     "review": 4
    //   },
    //   {
    //     "id": 1009,
    //     "title": "Gaming Set",
    //     "image1Url": "gaming-set.jpg",
    //     "format": "Electronics",
    //     "price": 299,
    //     "review": 3
    //   },
    //   {
    //     "id": 1010,
    //     "title": "Gold Phone Case",
    //     "image1Url": "gold-phone-case.jpg",
    //     "format": "Accessories",
    //     "price": 24,
    //     "review": 4
    //   },
    //   {
    //     "id": 1011,
    //     "title": "Green Earbuds",
    //     "image1Url": "green-earbuds.jpg",
    //     "format": "Electronics",
    //     "price": 89,
    //     "review": 4
    //   },
    //   {
    //     "id": 1012,
    //     "title": "Green T-Shirt",
    //     "image1Url": "green-t-shirt.jpg",
    //     "format": "Clothing",
    //     "price": 49,
    //     "review": 5
    //   },
    //   {
    //     "id": 1013,
    //     "title": "Grey T-Shirt",
    //     "image1Url": "grey-t-shirt.jpg",
    //     "format": "Clothing",
    //     "price": 48,
    //     "review": 3
    //   },
    //   {
    //     "id": 1014,
    //     "title": "Headphones",
    //     "image1Url": "headphones.jpg",
    //     "format": "Electronics",
    //     "price": 175,
    //     "review": 5
    //   },
    //   {
    //     "id": 1015,
    //     "title": "Light Green T-Shirt",
    //     "image1Url": "light-green-t-shirt.jpg",
    //     "format": "Clothing",
    //     "price": 49,
    //     "review": 4
    //   },
    //   {
    //     "id": 1016,
    //     "title": "Lime Band",
    //     "image1Url": "lime-band.jpg",
    //     "format": "Fitness",
    //     "price": 79,
    //     "review": 3
    //   },
    //   {
    //     "id": 1017,
    //     "title": "Mini Speakers",
    //     "image1Url": "mini-speakers.jpg",
    //     "format": "Electronics",
    //     "price": 85,
    //     "review": 4
    //   },
    //   {
    //     "id": 1018,
    //     "title": "Painted Phone Case",
    //     "image1Url": "painted-phone-case.jpg",
    //     "format": "Accessories",
    //     "price": 56,
    //     "review": 5
    //   },
    //   {
    //     "id": 1019,
    //     "title": "Pink Band",
    //     "image1Url": "pink-band.jpg",
    //     "format": "Fitness",
    //     "price": 79,
    //     "review": 4
    //   },
    //   {
    //     "id": 1020,
    //     "title": "Pink Purse",
    //     "image1Url": "pink-purse.jpg",
    //     "format": "Accessories",
    //     "price": 110,
    //     "review": 4
    //   },
    //   {
    //     "id": 1021,
    //     "title": "Purple Band",
    //     "image1Url": "purple-band.jpg",
    //     "format": "Fitness",
    //     "price": 79,
    //     "review": 3
    //   },
    //   {
    //     "id": 1022,
    //     "title": "Purple Gemstone Necklace",
    //     "image1Url": "purple-gemstone-necklace.jpg",
    //     "format": "Accessories",
    //     "price": 45,
    //     "review": 4
    //   },
    //   {
    //     "id": 1023,
    //     "title": "Purple T-Shirt",
    //     "image1Url": "purple-t-shirt.jpg",
    //     "format": "Clothing",
    //     "price": 49,
    //     "review": 5
    //   },
    //   {
    //     "id": 1024,
    //     "title": "Shoes",
    //     "image1Url": "shoes.jpg",
    //     "format": "Clothing",
    //     "price": 64,
    //     "review": 4
    //   },
    //   {
    //     "id": 1025,
    //     "title": "Sneakers",
    //     "image1Url": "sneakers.jpg",
    //     "format": "Clothing",
    //     "price": 78,
    //     "review": 4
    //   },
    //   {
    //     "id": 1026,
    //     "title": "Teal T-Shirt",
    //     "image1Url": "teal-t-shirt.jpg",
    //     "format": "Clothing",
    //     "price": 49,
    //     "review": 3
    //   },
    //   {
    //     "id": 1027,
    //     "title": "Yellow Earbuds",
    //     "image1Url": "yellow-earbuds.jpg",
    //     "format": "Electronics",
    //     "price": 89,
    //     "review": 3
    //   },
    //   {
    //     "id": 1028,
    //     "title": "Yoga Mat",
    //     "image1Url": "yoga-mat.jpg",
    //     "format": "Fitness",
    //     "price": 20,
    //     "review": 5
    //   },
    //   {
    //     "id": 1029,
    //     "title": "Yoga Set",
    //     "image1Url": "yoga-set.jpg",
    //     "format": "Fitness",
    //     "price": 20,
    //     "review": 4
    //   }
    // ];

    // this.models = [
    //   {
    //     "id": 22,
    //     "reviewNotes": null,
    //     "resolved": false,
    //     "title": "Sample Review Request",
    //     "description": "Detailed description",
    //     "modelUrl": "http://example.com/model",
    //     "image1Url": "http://example.com/image1.jpg",
    //     "image2Url": "http://example.com/image2.jpg",
    //     "image3Url": "http://example.com/image3.jpg",
    //     "tags": [
    //       "tag1",
    //       "tag2"
    //     ],
    //     "downloadType": "Free",
    //     "license": "GPL",
    //     "format": "OBJ",
    //     "price": 0,
    //     "rejected": false,
    //     "createdAt": "2024-12-01T18:28:31.055Z",
    //     "model": {
    //       "id": 19,
    //       "fileName": "model_2024-11-30T09-29-27-925Z.obj",
    //       "parameters": {
    //         "Valid": false,
    //         "Volume": [
    //           120.07894778520348,
    //           true
    //         ],
    //         "Centroid": [
    //           -0.00008117813792472932,
    //           10.572018672501972,
    //           -0.3266893091936809
    //         ],
    //         "Face Count": [
    //           48918,
    //           false
    //         ],
    //         "Surface Area": [
    //           267.17847867213436,
    //           true
    //         ],
    //         "Vertex Count": [
    //           24461,
    //           true
    //         ],
    //         "File Size (MB)": [
    //           2.4621667861938477,
    //           true
    //         ],
    //         "Watertight Status": true,
    //         "Bounding Box Dimensions": [
    //           11.685,
    //           20.7407,
    //           3.7701000000000002
    //         ]
    //       },
    //       "valid": false
    //     },
    //     "modelOwner": {
    //       "id": 1,
    //       "displayName": "Jonx",
    //       "biography": "Experienced software developer.",
    //       "profilePicture": "https://example.com/profile.jpg",
    //       "personalWebsite": "https://johndoe.com",
    //       "twitterUsername": "johndoe",
    //       "facebookUsername": "johndoe",
    //       "linkedInUsername": "johndoe",
    //       "skills": [
    //         "JavaScript",
    //         "TypeScript",
    //         "Node.js"
    //       ],
    //       "contactNumber": "+1234567890",
    //       "createdAt": "2024-11-27T16:47:21.617Z",
    //       "updatedAt": "2024-11-27T16:47:21.617Z",
    //       "bankName": "Bank ABC",
    //       "accountNumber": "123456789",
    //       "branch": "Downtown",
    //       "accountName": "John Doe",
    //       "accountBalance": 0
    //     }
    //   },
    //   {
    //     "id": 23,
    //     "reviewNotes": null,
    //     "resolved": false,
    //     "title": "fsdfsfs",
    //     "description": "efeefv",
    //     "modelUrl": "http://localhost:3000/uploads/model_2024-12-01T02-29-15-383Z_2024-12-01T11-12-28-923Z.obj",
    //     "image1Url": "http://localhost:3000/uploads/Become a Creator- Add Account Details_1112_2024-12-01T11-12-57-094Z.png",
    //     "image2Url": "http://localhost:3000/uploads/Sineth_Dhananjaya_Image_907_2024-12-01T11-12-57-108Z.jpg",
    //     "image3Url": "http://localhost:3000/uploads/IMG_0410_5865_2024-12-01T11-12-57-127Z.HEIC",
    //     "tags": [
    //       "errr",
    //       "werew",
    //       "efwefwf"
    //     ],
    //     "downloadType": "Paid",
    //     "license": "creative common",
    //     "format": "obj",
    //     "price": 10,
    //     "rejected": false,
    //     "createdAt": "2024-12-01T18:44:27.904Z",
    //     "model": {
    //       "id": 34,
    //       "fileName": "herbie_the_love_bug_2024-11-30T15-28-55-871Z.glb",
    //       "parameters": {
    //         "Valid": false,
    //         "Face Count": [
    //           34610,
    //           false
    //         ],
    //         "Mesh Count": 28,
    //         "Node Count": 1,
    //         "Scene Count": 1,
    //         "Vertex Count": [
    //           30710,
    //           false
    //         ],
    //         "File Size (MB)": [
    //           3.880809783935547,
    //           true
    //         ]
    //       },
    //       "valid": false
    //     },
    //     "modelOwner": {
    //       "id": 1,
    //       "displayName": "Jonx",
    //       "biography": "Experienced software developer.",
    //       "profilePicture": "https://example.com/profile.jpg",
    //       "personalWebsite": "https://johndoe.com",
    //       "twitterUsername": "johndoe",
    //       "facebookUsername": "johndoe",
    //       "linkedInUsername": "johndoe",
    //       "skills": [
    //         "JavaScript",
    //         "TypeScript",
    //         "Node.js"
    //       ],
    //       "contactNumber": "+1234567890",
    //       "createdAt": "2024-11-27T16:47:21.617Z",
    //       "updatedAt": "2024-11-27T16:47:21.617Z",
    //       "bankName": "Bank ABC",
    //       "accountNumber": "123456789",
    //       "branch": "Downtown",
    //       "accountName": "John Doe",
    //       "accountBalance": 0
    //     }
    //   },
    //   {
    //     "id": 17,
    //     "reviewNotes": null,
    //     "resolved": false,
    //     "title": "fsdfsfs",
    //     "description": "efeefv",
    //     "modelUrl": "http://localhost:3000/uploads/model_2024-12-01T02-29-15-383Z_2024-12-01T11-12-28-923Z.obj",
    //     "image1Url": "http://localhost:3000/uploads/Become a Creator- Add Account Details_1112_2024-12-01T11-12-57-094Z.png",
    //     "image2Url": "http://localhost:3000/uploads/Sineth_Dhananjaya_Image_907_2024-12-01T11-12-57-108Z.jpg",
    //     "image3Url": "http://localhost:3000/uploads/IMG_0410_5865_2024-12-01T11-12-57-127Z.HEIC",
    //     "tags": [
    //       "errr",
    //       "werew",
    //       "efwefwf"
    //     ],
    //     "downloadType": "Paid",
    //     "license": "creative common",
    //     "format": "obj",
    //     "price": 10,
    //     "rejected": false,
    //     "createdAt": "2024-12-01T11:13:20.341Z",
    //     "model": {
    //       "id": 69,
    //       "fileName": "model_2024-12-01T02-29-15-383Z_2024-12-01T11-12-28-923Z.obj",
    //       "parameters": {
    //         "Valid": [
    //           "",
    //           false
    //         ],
    //         "Volume": [
    //           120.07894778520348,
    //           true
    //         ],
    //         "Centroid": [
    //           -0.00008117813792472932,
    //           10.572018672501972,
    //           -0.3266893091936809
    //         ],
    //         "Face Count": [
    //           48918,
    //           false
    //         ],
    //         "Surface Area": [
    //           267.17847867213436,
    //           true
    //         ],
    //         "Vertex Count": [
    //           24461,
    //           true
    //         ],
    //         "File Size (MB)": [
    //           2.4621667861938477,
    //           true
    //         ],
    //         "Watertight Status": [
    //           "",
    //           true
    //         ],
    //         "Bounding Box Dimensions": [
    //           11.685,
    //           20.7407,
    //           3.7701000000000002
    //         ]
    //       },
    //       "valid": false
    //     },
    //     "modelOwner": {
    //       "id": 1,
    //       "displayName": "Jonx",
    //       "biography": "Experienced software developer.",
    //       "profilePicture": "https://example.com/profile.jpg",
    //       "personalWebsite": "https://johndoe.com",
    //       "twitterUsername": "johndoe",
    //       "facebookUsername": "johndoe",
    //       "linkedInUsername": "johndoe",
    //       "skills": [
    //         "JavaScript",
    //         "TypeScript",
    //         "Node.js"
    //       ],
    //       "contactNumber": "+1234567890",
    //       "createdAt": "2024-11-27T16:47:21.617Z",
    //       "updatedAt": "2024-11-27T16:47:21.617Z",
    //       "bankName": "Bank ABC",
    //       "accountNumber": "123456789",
    //       "branch": "Downtown",
    //       "accountName": "John Doe",
    //       "accountBalance": 0
    //     }
    //   },
    //   {
    //     "id": 18,
    //     "reviewNotes": null,
    //     "resolved": false,
    //     "title": "fsdfsfs",
    //     "description": "ggdgdf",
    //     "modelUrl": "http://localhost:3000/uploads/model_2024-12-01T02-29-15-383Z_2024-12-01T11-27-25-845Z.obj",
    //     "image1Url": "http://localhost:3000/uploads/Become a Creator- Add Account Details_3235_2024-12-01T11-27-57-950Z.png",
    //     "image2Url": "http://localhost:3000/uploads/Sineth_Dhananjaya_Image_5674_2024-12-01T11-27-57-965Z.jpg",
    //     "image3Url": "http://localhost:3000/uploads/IMG_0410_4503_2024-12-01T11-27-57-983Z.HEIC",
    //     "tags": [
    //       "errr",
    //       "werew",
    //       "efwefwf"
    //     ],
    //     "downloadType": "Free",
    //     "license": "CC0",
    //     "format": "obj",
    //     "price": 0,
    //     "rejected": false,
    //     "createdAt": "2024-12-01T11:27:58.056Z",
    //     "model": {
    //       "id": 70,
    //       "fileName": "model_2024-12-01T02-29-15-383Z_2024-12-01T11-27-25-845Z.obj",
    //       "parameters": {
    //         "Valid": [
    //           "",
    //           false
    //         ],
    //         "Volume": [
    //           120.07894778520348,
    //           true
    //         ],
    //         "Centroid": [
    //           -0.00008117813792472932,
    //           10.572018672501972,
    //           -0.3266893091936809
    //         ],
    //         "Face Count": [
    //           48918,
    //           false
    //         ],
    //         "Surface Area": [
    //           267.17847867213436,
    //           true
    //         ],
    //         "Vertex Count": [
    //           24461,
    //           true
    //         ],
    //         "File Size (MB)": [
    //           2.4621667861938477,
    //           true
    //         ],
    //         "Watertight Status": [
    //           "",
    //           true
    //         ],
    //         "Bounding Box Dimensions": [
    //           11.685,
    //           20.7407,
    //           3.7701000000000002
    //         ]
    //       },
    //       "valid": false
    //     },
    //     "modelOwner": {
    //       "id": 1,
    //       "displayName": "Jonx",
    //       "biography": "Experienced software developer.",
    //       "profilePicture": "https://example.com/profile.jpg",
    //       "personalWebsite": "https://johndoe.com",
    //       "twitterUsername": "johndoe",
    //       "facebookUsername": "johndoe",
    //       "linkedInUsername": "johndoe",
    //       "skills": [
    //         "JavaScript",
    //         "TypeScript",
    //         "Node.js"
    //       ],
    //       "contactNumber": "+1234567890",
    //       "createdAt": "2024-11-27T16:47:21.617Z",
    //       "updatedAt": "2024-11-27T16:47:21.617Z",
    //       "bankName": "Bank ABC",
    //       "accountNumber": "123456789",
    //       "branch": "Downtown",
    //       "accountName": "John Doe",
    //       "accountBalance": 0
    //     }
    //   }
    // ]

    // console.log(this.models);
  }


  clear(table: Table) {
    table.clear();
  }


  reviewNow(product: any) {
      console.log(product);
    this.router.navigate(['/mod_manual_verify'], { state: { data: product } });

  }

}
