import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{ HomepageComponent } from './usercomponents/homepage/homepage.component';
import {AngularToastifyModule} from "angular-toastify";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet,CommonModule, HomepageComponent, AngularToastifyModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'metanet';
}
