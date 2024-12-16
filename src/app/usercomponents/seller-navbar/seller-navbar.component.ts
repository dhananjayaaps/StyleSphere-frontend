import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MenuItem, PrimeTemplate} from "primeng/api";
import {CartItem, UserRole} from "../../domain/models";
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {isPlatformBrowser, NgIf} from "@angular/common";
import {BASE_url} from "../../app.config";
import {BadgeModule} from "primeng/badge";
import {Button} from "primeng/button";
import {MenuModule} from "primeng/menu";

@Component({
  selector: 'app-seller-navbar',
  standalone: true,
  imports: [
    BadgeModule,
    Button,
    MenuModule,
    NgIf,
    PrimeTemplate,
    RouterLink
  ],
  templateUrl: './seller-navbar.component.html',
  styleUrl: './seller-navbar.component.css'
})
export class SellerNavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
private cartItems!: CartItem[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private http: HttpClient
) {}

  ngOnInit() {
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
            label: 'Dashboard',
            icon: 'pi pi-home',
            command: () => {
              this.router.navigate(['/usertransactions']);
            },
          },
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigate(['/settings']);
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





  navigateTo() {

      this.router.navigate(['/marketplace-products']);

  }
}
