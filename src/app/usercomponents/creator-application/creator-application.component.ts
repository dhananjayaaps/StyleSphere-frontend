import { Component } from '@angular/core';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { UserProfileHeaderComponent } from "../user-profile-header/user-profile-header.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-creator-application',
  standalone: true,
  imports: [UserNavbarComponent, UserProfileHeaderComponent, FooterComponent],
  templateUrl: './creator-application.component.html',
  styleUrl: './creator-application.component.css'
})


export class CreatorApplicationComponent {

  constructor(
    private router: Router
  ) {}
  
}
