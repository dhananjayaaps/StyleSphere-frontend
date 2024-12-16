import {Component, OnInit} from '@angular/core';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { UserProfileHeaderComponent } from "../user-profile-header/user-profile-header.component";
import { FooterComponent } from "../footer/footer.component";
import { TabViewModule } from 'primeng/tabview';
import { FormControl, FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ModelOwner} from "../../domain/models";
import {BASE_url} from "../../app.config";
import {SellerNavbarComponent} from "../seller-navbar/seller-navbar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    UserNavbarComponent,
    UserProfileHeaderComponent,
    FooterComponent,
    TabViewModule,
    ReactiveFormsModule,
    SellerNavbarComponent,
    NgIf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {


  ngOnInit() {
    this.loadProfile();
  }

  data!: ModelOwner;

  constructor(private http: HttpClient) {}



  changePassword = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),


  });

  loadProfile() {
    this.http.get<ModelOwner>(BASE_url+'/sellers/myaccount',{withCredentials:true}).subscribe( {
      next: (data) => {
        console.log(data);
        this.data= data;
      },error: (error) => {
        console.log(error);
      }
    });

  }

  resetPassword() {
    // Ensure the new password and confirm password match
    if (this.changePassword.value.newPassword !== this.changePassword.value.confirmPassword) {
      alert('New Password and Confirm Password do not match!');
      return;
    }

    // Create the payload
    const payload = {
      oldPassword: this.changePassword.value.currentPassword,
      newPassword: this.changePassword.value.newPassword,
    };

    // Make the HTTP POST request
    this.http.post('http://localhost:3000/auth/change-password', payload, {withCredentials: true}).subscribe({
      next: (response) => {
        console.log('Password reset successful:', response);
        alert('Password has been reset successfully!');
        this.changePassword.reset(); // Clear the form after success
      },
      error: (error) => {
        console.error('Password reset failed:', error);
        alert(`Error resetting password: ${error.error?.message || 'Unexpected error occurred'}`);
      },
    });
  }

}
