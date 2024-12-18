import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ToastService} from "angular-toastify";
import { Router } from '@angular/router';
import {SellerNavbarComponent} from "../seller-navbar/seller-navbar.component";

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [FooterComponent, SelectButtonModule, CommonModule, FormsModule, SellerNavbarComponent],
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements AfterViewInit {
  Object = Object;
  formData: any = {
    title: '',
    description: '',
    category: '',
    tags: '',
    downloadType: 'Free',
    license: '',
    format: '',
    price: 0,
    images: [],
    modelFile: null,
  };

  modelPreviewUrl: string | null = null;
  modelParameters: any = null;
  loadingParameters = false;
  isModelUploaded = false;
  modelId = '';
  private readonly imageUploadUrl = 'http://localhost:3000/upload/image';
  private readonly submitUrl = 'http://localhost:3000/vebxrmodel/';

  @ViewChild('modelPreviewCanvas', { static: false }) modelPreviewCanvas!: ElementRef<HTMLCanvasElement>;
  isValidModel: boolean | null = null;

  dynamicModelUrl: string = '';

  constructor(private _toastService: ToastService, private router: Router) {}

  ngAfterViewInit() {
  }

  async uploadImage(image: File): Promise<string> {
    const formData = new FormData();
    console.log(image);
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


  onFileSelect(event: any, type: string): void {
    const files = event.target.files;
  
    if (type === 'model') {
      if (files && files[0]) {
        this.formData.modelFile = files[0];
        this.isModelUploaded = false;
        // this.loadModel(files[0]);
      }
    } else if (type === 'images') {
      if (files.length > 0) {
        // If a new image is uploaded, clear the previously stored image URL.
        this.formData.images = Array.from(files).slice(0, 1); // Allow only 1 image.
      } else {
        // Clear the image URL if the user removes the uploaded image.
        this.formData.images = [];
      }
    }
  }
  
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.formData.category || this.formData.category === '') {
      this._toastService.warn('Please select a valid category.');
      return;
    }

    // Check if price is greater than 0
    if (this.formData.price <= 0) {
      this._toastService.warn('Price must be greater than 0.');
      return;
    }
  
    // Ensure there's at least one image.
    if (this.formData.images.length !== 1) {
      this._toastService.warn('Please upload exactly 1 image.');
      return;
    }
  
    try {
      // Check if the image needs to be uploaded (new file selected).
      if (typeof this.formData.images[0] !== 'string') {
        // Upload the image and update its URL.
        this.formData.images[0] = await this.uploadImage(this.formData.images[0]);
  
        if (!this.formData.images[0]) {
          throw new Error('Image upload failed.');
        }
      }
  
      // Convert tags to an array.
      const tagsArray = this.formData.tags.split(',').map((tag: string) => tag.trim());
      this.formData.tags = tagsArray;
  
      // Convert category to a number.
      this.formData.category = Number(this.formData.category);
  
      // Prepare the final form data.
      const formData = {
        ...this.formData,
        image1Url: this.formData.images[0],
      };
  
      // Submit the form.
      const response = await fetch(this.submitUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
  
      if (!response.ok) throw new Error('Failed to submit the form.');
  
      this._toastService.success('Model uploaded successfully!');
      const result = await response.json();
      this.router.navigate(['/upload-success/', result.id]);
  
    } catch (error) {
      console.error('Error submitting form:', error);
  
      // Retain the previously uploaded image URL in case of failure.
      if (typeof this.formData.images[0] === 'string') {
        this._toastService.error('Failed to submit the form. Image URL retained.');
      } else {
        // Clear the image if the upload failed.
        this.formData.images = [];
        this._toastService.error('Failed to upload the image. Please try again.');
      }
    }
  }
  

}
