import {Component, OnInit} from '@angular/core';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { UserProfileHeaderComponent } from "../user-profile-header/user-profile-header.component";
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule, HttpEventType} from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import {Router} from "@angular/router";
import {LikedModels, Purchases} from "../../domain/models";
import {BASE_url} from "../../app.config";




interface ModelPageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

interface CollectionPageEvent{
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

interface Model {
  image: string;
  name: string;
  price: string;
}

interface Collection{
  image: string;
  name: string;
  icon: string;
  modelcount?: number;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    UserNavbarComponent,
    FooterComponent,
    TabViewModule,
    ButtonModule,
    UserProfileHeaderComponent,
    PaginatorModule,
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    FileUploadModule,
    ToastModule,
    HttpClientModule

  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  providers: [MessageService]
})
export class UserProfileComponent implements OnInit{
  LikedModels!: LikedModels[];
  OwnedModels!: Purchases[];



  constructor(private http:HttpClient,private router:Router) {}


  ngOnInit() {
    this.getOwnedModels()
    this.getLikedModels()
  }
  getLikedModels(){
    this.http.get<LikedModels[]>(BASE_url+'/likes/mylikemodels',{withCredentials:true}).subscribe( {
      next: (data) => {
        this.LikedModels = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  getOwnedModels(){
    this.http.get<Purchases[]>(BASE_url+'/payment/purchases',{withCredentials:true}).subscribe( {
      next: (data) => {
        this.OwnedModels = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  dislikeModel(modelId?:number){
    if(modelId == undefined){
      return;
    }
    this.http.post(BASE_url+'/likes/dislike/'+modelId,{},{withCredentials:true}).subscribe({
      next: (data) => {
        console.log(data);
        this.getLikedModels();
      },
      error: (error) => {
        console.log(error);
      }
    });

  }
  navigateToDescription(modelId?: number): void {
    if (modelId == undefined){
      return;
    }
    this.router.navigate(['/marketplace-product-description'],{ queryParams: { id: modelId } });
  }













}
