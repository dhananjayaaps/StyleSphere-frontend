import { Component } from '@angular/core';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {ToastService} from "angular-toastify";
import { BASE_url } from 'src/app/app.config';
import { profile } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-register',
  standalone: true,
  imports: [UserNavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css']
})
export class SellerRegisterComponent {
  sellerDetails: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private _toastService: ToastService, private router: Router) {
    this.sellerDetails = this.fb.group({
      profilePicture: [''],
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      biography: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      skills: [''],
      personalWebsite: ['', Validators.pattern(/https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)],
      twitterUsername: [''],
      facebookUsername: [''],
      linkedInUsername: [''],
      bankName: ['', Validators.required],
      accountNumber: [''],
      branch: ['', Validators.required],
      accountName: ['', Validators.required],
      
    });
  }

  imageUploadUrl = BASE_url + '/upload/image';
  imageFile: File | null = null;

  async ceratorRegister() {
    if (this.sellerDetails.valid) {
      const sellerData = this.sellerDetails.value;

      if (this.imageFile) {
        sellerData.profilePicture = await this.uploadImage(this.imageFile);
      } else {
        sellerData.profilePicture = '';
      }

      this.http.post('http://localhost:3000/sellers', sellerData, { withCredentials: true }).subscribe({
        next: (response) => {
          console.log('Profile saved successfully', response);
          this._toastService.success('Profile saved successfully!');
          this.router.navigate(['/usertransactions']);

        },
        error: (error) => {
          console.error('Error saving profile', error);
          this._toastService.error('Error saving profile.');
        }
      });
    } else {
      this._toastService.error('Please fill in all required fields correctly.');
      this.sellerDetails.markAllAsTouched(); // Highlight invalid fields
    }
  }

  onFileSelect(event: any, type: string): void {
    const files = event.target.files;

    if (files.length > 0) {
      this.imageFile = files[0]; 
    }
  }


  async uploadImage(image: File): Promise<string> {
    console.log(image);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch(this.imageUploadUrl, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to upload the image file');
      }

      const result = await response.json();
      return result.fileAccessUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      this._toastService.error('Failed to upload the image. Please try again.');
      return '';
    }
  }


}
