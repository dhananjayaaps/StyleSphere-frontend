import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import {FormsModule, Validators} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { MeterGroupModule } from 'primeng/metergroup';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {BASE_url} from "../../app.config";
import {Model, ModelDetails, ModelFile} from "../../domain/models";
import {ToastService} from "angular-toastify";
import {animate, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-marketplace-product-description',
  standalone: true,
  imports: [
    UserNavbarComponent,
    FooterComponent,
    FormsModule,
    RatingModule,
    InputNumberModule,
    TabViewModule,
    AvatarModule,
    AvatarGroupModule,
    DataViewModule,
    CommonModule,
    MeterGroupModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextareaModule,
    RouterModule
  ],
  templateUrl: './marketplace-product-description.component.html',
  styleUrl: './marketplace-product-description.component.css',

})
export class MarketplaceProductDescriptionComponent {
  visibleReviewForm: boolean = false;
  id = 0;
  formGroup!: FormGroup;
  question!:FormGroup;
  data!:ModelDetails
  AiAnswer!:{responce:string[]}
  models:any[] = []
  AnalitycsofRating  = {
    onestar:0,
    twostar:0,
    threestar:0,
    fourstar:0,
    fivestar:0
  };
  @ViewChild(UserNavbarComponent) childComponent!: UserNavbarComponent;


  constructor(private route:ActivatedRoute,private http: HttpClient,private toastService: ToastService,private renderer: Renderer2, private el: ElementRef) {
  }
  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      const ID = params.get('id');
      if (ID) {
        this.id = parseInt(ID);
      }
      this.getData()
    });
    this.formGroup = new FormGroup({
      modelId: new FormControl(this.id),
      reviewMessage: new FormControl("",[Validators.required]),
      reviewStars: new FormControl(0,[Validators.required]),
    });
    this.question = new FormGroup({
      modelId: new FormControl(this.id),
      question: new FormControl("",[Validators.required]),
    });

  }

  getData(){
    // this.toastService.error("Something went wrong")
    this.http.get<ModelDetails>(BASE_url+"/vebxrmodel/"+this.id,{withCredentials:true}).subscribe({
      next: (data) => {
        console.log(data);
        this.data = data;
        this.models.push(data.model.model.parameters)
        this.AnalyzeRating()
      },
      error: (error) => {
        console.error(error);

      },
    })
  }

  AnalyzeRating(){
    const total =this.getReviewCount();
    this.data.reviews.forEach((review)=>{
      console.log(review.reviewStars)
      if(review.reviewStars == 1){
        this.AnalitycsofRating.onestar++;
      }
      if(review.reviewStars == 2){
        this.AnalitycsofRating.twostar++;
      }
      if(review.reviewStars == 3){
        this.AnalitycsofRating.threestar++;
      }
      if(review.reviewStars == 4){
        this.AnalitycsofRating.fourstar++;
      }
      if(review.reviewStars == 5){
        this.AnalitycsofRating.fivestar++;
      }
    })
    this.AnalitycsofRating.onestar = (this.AnalitycsofRating.onestar/total)*100;
    this.AnalitycsofRating.twostar = (this.AnalitycsofRating.twostar/total)*100;
    this.AnalitycsofRating.threestar = (this.AnalitycsofRating.threestar/total)*100;
    this.AnalitycsofRating.fourstar = (this.AnalitycsofRating.fourstar/total)*100;
    this.AnalitycsofRating.fivestar = (this.AnalitycsofRating.fivestar/total)*100;

    console.log(this.AnalitycsofRating)
  }

  getReviewCount(){
    return this.data.reviews.length
  }

  showReviewForm() {
    this.visibleReviewForm = true;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  closeReviewForm() {
    this.visibleReviewForm = false;
  }


  color_bg: number=0x292929;
  AskAIForm: boolean= false;
  requested: boolean = false;
  askAnother: boolean = false;

  postReview() {
    if (this.formGroup.invalid) {
      this.toastService.error("Please fill all the fields")
      return;
    }else {

      console.log(this.formGroup.value);
      this.http.post(BASE_url+"/payment/review",this.formGroup.value,{withCredentials:true}).subscribe({
        next: (data) => {
          this.toastService.success("Review posted")
          this.getData()
          this.visibleReviewForm = false;
        },
        error: (error) => {
          this.toastService.error(error.error.message||"Something went wrong")
          console.error('There was an error!', error);
        }
      })
    }
  }

  SendAI() {
    this.askAnother = false;
    this.requested = true;
    this.AiAnswer = {responce:[]}
    console.log(this.question.value);
    this.http.post<{responce:string[]}>(BASE_url+"/vebxrmodel/askfromai",this.question.value,{withCredentials:true}).subscribe({
      next: (data) => {
          this.AiAnswer = data;
          this.askAnother = true;
      },
      error: (error) => {
        this.toastService.error(error.error.message||"Something went wrong")
        console.error('There was an error!', error);
      }
    })
  }
  StartAnimation() {
    this.AskAIForm = true;
    setTimeout(() => {
      const box = this.el.nativeElement.querySelector('.box');
      let direction = 1; // 1 for up, -1 for down
      let position = 0; // Current position

      setInterval(() => {
        // Update position
        if (position >= 10) direction = -0.2;
        if (position <= 0) direction = 0.3;
        position += direction;

        // Apply transform
        this.renderer.setStyle(box, 'transform', `translateY(${position}px)`);
      }, 16);
    }, 100);

  }

  AddToCart(id: number) {
    this.http.post(BASE_url+"/cart",{modelId:id},{withCredentials:true}).subscribe({
      next: (data) => {
        this.childComponent.GetItems()
        this.toastService.success("Item added to cart")
      },
      error: (error) => {
        this.toastService.error(error.error.message||"Something went wrong")
        console.error('There was an error!', error);
      }
    })

  }


  DownloadModel(url: string) {
    window.open(url, '_blank')
  }
}
