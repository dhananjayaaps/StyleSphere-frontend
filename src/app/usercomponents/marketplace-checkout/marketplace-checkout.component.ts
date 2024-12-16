import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';

@Component({
  selector: 'app-marketplace-checkout',
  standalone: true,
  imports: [UserNavbarComponent, FooterComponent],
  templateUrl: './marketplace-checkout.component.html',
  styleUrl: './marketplace-checkout.component.css'
})
export class MarketplaceCheckoutComponent {

}
