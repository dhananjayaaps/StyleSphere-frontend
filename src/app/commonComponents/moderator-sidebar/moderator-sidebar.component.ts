import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {CartItem, UserRole} from "../../domain/models";
import {BASE_url} from "../../app.config";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-moderator-sidebar',
  standalone: true,
    imports: [
        NgIf,
        RouterLink
    ],
  templateUrl: './moderator-sidebar.component.html',
  styleUrl: './moderator-sidebar.component.css'
})
export class ModeratorSidebarComponent implements OnInit{

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    this.getRoles();
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
    return this.roles.includes('moderator');
  }

  Auto_navigateTo() {
    if (!this.hasAuthority()) {
      this.router.navigate(['/home']);
    }
  }

}
