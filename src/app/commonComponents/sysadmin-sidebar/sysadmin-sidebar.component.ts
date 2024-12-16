import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {CartItem, UserRole} from "../../domain/models";
import {BASE_url} from "../../app.config";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-sysadmin-sidebar',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgClass
  ],
  templateUrl: './sysadmin-sidebar.component.html',
  styleUrl: './sysadmin-sidebar.component.css'
})
export class SysadminSidebarComponent implements OnInit{
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
    return this.roles.includes('sysadmin');
  }

  Auto_navigateTo() {
    if (!this.hasAuthority()) {
      this.router.navigate(['/home']);
    }
  }
}
