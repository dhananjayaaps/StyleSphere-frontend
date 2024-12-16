import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {AccordionModule} from "primeng/accordion";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {Router, RouterLink} from "@angular/router";
import {CartItem, UserRole} from "../../domain/models";
import {BASE_url} from "../../app.config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    AvatarModule,
    BadgeModule,
    RouterLink
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit{
  isFinanceOpen = false;


  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.getRoles();
  }


  toggleFinance() {
    this.isFinanceOpen = !this.isFinanceOpen;
  }

  roles!:string[]
  private cartItems!: CartItem[];
  getRoles() {
    this.http.get<UserRole>(BASE_url+'/auth/profile',{withCredentials:true}).subscribe( {
      next: (data) => {
        this.roles = data.roles;
        this.Auto_navigateTo();
      },error: (error) => {
        console.log(error);
        if (error.status == 401) {
          this.router.navigate(['/home']);
        }
      }
    });
  }
  hasAuthority() {
    return this.roles.includes('admin');
  }

  Auto_navigateTo() {
    if (!this.hasAuthority()) {
      this.router.navigate(['/home']);
    }
  }
}
