import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { LandingnavbarComponent } from '../landingnavbar/landingnavbar.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [LandingnavbarComponent, FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

}
