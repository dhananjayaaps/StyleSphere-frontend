import { Component } from '@angular/core';
import { LandingnavbarComponent } from '../landingnavbar/landingnavbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-registrationsuccess',
  standalone: true,
  imports: [LandingnavbarComponent, FooterComponent],
  templateUrl: './registrationsuccess.component.html',
  styleUrl: './registrationsuccess.component.css'
})
export class RegistrationsuccessComponent {

}
