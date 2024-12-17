import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {ToastService} from "angular-toastify";
import { Router } from '@angular/router';
import {SellerNavbarComponent} from "../seller-navbar/seller-navbar.component";

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [UserNavbarComponent, FooterComponent, SelectButtonModule, CommonModule, FormsModule, SellerNavbarComponent],
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

  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private controls: OrbitControls | null = null;
  private model: THREE.Object3D | null = null;
  isValidModel: boolean | null = null;

  // dynamicModelUrl: string = 'http://localhost:3000/uploads/herbie_the_love_bug_2024-12-01T05-13-26-023Z.glb';
  dynamicModelUrl: string = '';

  constructor(private _toastService: ToastService, private router: Router) {}

  ngAfterViewInit() {

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
        this.formData.images = Array.from(files).slice(0, 3);
      }
    }
  }


  async uploadImage(image: File): Promise<string> {
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

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const modelUrl = this.dynamicModelUrl;

    if (!modelUrl) {
      this._toastService.error('Model upload failed.');
      return;
    }

    if (this.formData.images.length !== 3) {
      this._toastService.warn('Please upload at least 3 images.');
      return;
    }

    //upload the images iteratively
    for (let i = 0; i < this.formData.images.length; i++) {
      this.formData.images[i] = await this.uploadImage(this.formData.images[i]);
    }

    //make a array for formdata.tags
    let tagsArray = this.formData.tags.split(',');
    this.formData.tags = tagsArray;

    //make category as a number
    this.formData.category = Number(this.formData.category);

    //get the extention from the modelUrl. split by . and get the last element
    let extention = modelUrl.split('.').pop();

    const formData = {
      ...this.formData,
      modelUrl: modelUrl,
      image1Url: this.formData.images[0],
      format: extention
    };

    try {
      const response = await fetch(this.submitUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to submit the form');

      this._toastService.success('Model uploaded successfully!');
      const result = await response.json();
      this.router.navigate(['/upload-success/', result.id]);

    } catch (error) {
      console.error('Error submitting form:', error);
      this._toastService.error('Failed to submit the form.');
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }
}
