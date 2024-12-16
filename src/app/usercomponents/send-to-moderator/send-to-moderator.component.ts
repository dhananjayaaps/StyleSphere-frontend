import { Component } from '@angular/core';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-send-to-moderator',
  standalone: true,
  imports: [UserNavbarComponent, FooterComponent],
  templateUrl: './send-to-moderator.component.html',
  styleUrl: './send-to-moderator.component.css'
})
export class SendToModeratorComponent {

}