import {Component, OnInit, ViewChild} from '@angular/core';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {HttpClient} from "@angular/common/http";
import {BASE_url} from "../../app.config";
import {NgForOf} from "@angular/common";
import {CartItem} from "../../domain/models";
import {ToastService} from "angular-toastify";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-marketplace-shoppingcart',
  standalone: true,
  imports: [UserNavbarComponent, FooterComponent, FormsModule, InputNumberModule, NgForOf],
  templateUrl: './marketplace-shoppingcart.component.html',
  styleUrl: './marketplace-shoppingcart.component.css'
})
export class MarketplaceShoppingcartComponent implements OnInit{
  value1: number = 50;
  cartItems!:CartItem[]
  @ViewChild(UserNavbarComponent) childComponent!: UserNavbarComponent;
  constructor(private http:HttpClient,private toast:ToastService,private router:Router) {}
  ngOnInit() {
    this.GetItems()
  }
  GetItems(){
    this.http.get<CartItem[]>(BASE_url+'/cart',{withCredentials:true}).subscribe( {
      next: (data) => {
        this.cartItems = data;
      },
      error: (error: any) => {
        console.log(error)
        this.cartItems = []
        this.toast.error(error.error.message)
      }
    })
  }


  removeItem(modelId: number) {
    this.http.delete(BASE_url+'/cart/'+modelId,{withCredentials:true}).subscribe({
      next: (data) => {
        this.childComponent.GetItems()
        this.GetItems()
        this.toast.success("Item removed from cart")
      },
      error: (error: any) => {
        console.log(error)
        this.toast.error(error.error.message)
      }
    })

  }
  getTotal(){
    let total = 0;
    this.cartItems.forEach(item=>{
      total += item.price
    })
    return total.toString()
  }

  ProceedtoCheckout(cartItems: CartItem[]) {
    const modeIDs = cartItems.map(item=>item.modelId)

    this.http.post<{session:{url:string}}>(BASE_url+'/payment/buy',{modelIds:modeIDs,paymentMethod:"card"},{withCredentials:true}).subscribe({
      next: (data) => {
        this.toast.success("Payment Successful")
        window.location.href=data.session.url
      },
      error: (error: any) => {
        console.log(error)
        this.toast.error(error.error.message)
      }
    })

  }
}
