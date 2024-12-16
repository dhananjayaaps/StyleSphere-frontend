import { Component } from '@angular/core';
import { LandingnavbarComponent } from '../landingnavbar/landingnavbar.component';
import { FooterComponent } from '../footer/footer.component';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-ordersuccessful',
  standalone: true,
  imports: [UserNavbarComponent, FooterComponent, RouterLink],
  templateUrl: './ordersuccessful.component.html',
  styleUrl: './ordersuccessful.component.css'
})
export class OrdersuccessfulComponent {

}
