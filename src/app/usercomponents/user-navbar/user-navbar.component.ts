import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CartItem, ModelDetails, UserRole} from "../../domain/models";
import {BASE_url} from "../../app.config";
@Component({
  selector: 'app-user-navbar',
  standalone: true,
  imports: [BadgeModule, MenuModule, ButtonModule, CommonModule],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css',
})
export class UserNavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  private cartItems!: CartItem[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.GetItems();
    this.getRoles();
    if (isPlatformBrowser(this.platformId)) {
      // Client-side code
      document.addEventListener('DOMContentLoaded', () => {
        // open
        const burger: NodeListOf<HTMLElement> =
          document.querySelectorAll('.navbar-burger');
        const menu: NodeListOf<HTMLElement> =
          document.querySelectorAll('.navbar-menu');

        if (burger.length && menu.length) {
          for (let i = 0; i < burger.length; i++) {
            burger[i].addEventListener('click', () => {
              for (let j = 0; j < menu.length; j++) {
                menu[j].classList.toggle('hidden');
              }
            });
          }
        }

        // close
        const close: NodeListOf<HTMLElement> =
          document.querySelectorAll('.navbar-close');
        const backdrop: NodeListOf<HTMLElement> =
          document.querySelectorAll('.navbar-backdrop');

        if (close.length) {
          for (let i = 0; i < close.length; i++) {
            close[i].addEventListener('click', () => {
              for (let j = 0; j < menu.length; j++) {
                menu[j].classList.toggle('hidden');
              }
            });
          }
        }

        if (backdrop.length) {
          for (let i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', () => {
              for (let j = 0; j < menu.length; j++) {
                menu[j].classList.toggle('hidden');
              }
            });
          }
        }
      });
    }

    this.items = [
      {
        // label: 'Guides',
        items: [
          {
            label: 'My Files',
            icon: 'pi pi-download',
            command: () => {
              this.router.navigate(['/userprofile']);
            },
          },
          {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => {
              this.router.navigate(['/home']);
            },
          },
        ],
      },
    ];
  }

  roles!: string[];
  getCartCount() {
    if (this.cartItems === undefined) {
      return 0;
    }
    return this.cartItems.length;
  }
  GetItems(){
    this.http.get<CartItem[]>(BASE_url+'/cart',{withCredentials:true}).subscribe( {
      next: (data) => {
        this.cartItems = data;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
  getRoles() {
    this.http.get<UserRole>(BASE_url+'/auth/profile',{withCredentials:true}).subscribe( {
      next: (data) => {
        this.roles = data.roles;
      },error: (error) => {
        console.log(error);
      }
    });
  }
  isSeller() {
    return this.roles.includes('seller');
  }

  navigateTo() {
    if (this.isSeller()) {
      this.router.navigate(['/usertransactions']);
    }else{
      this.router.navigate(['/become-creator']);
    }
  }
}
