import { Component } from '@angular/core';
import { UserProfileHeaderComponent } from "../user-profile-header/user-profile-header.component";
import { UserNavbarComponent } from "../user-navbar/user-navbar.component";
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BASE_url } from 'src/app/app.config';

interface Model {
  title: string;
  image: string;
  name: string;
  price: number;
  image1Url: string;
  discount: number;
  category: string;
  format: string;
  polyCount: string;
  license: string;
  rating: number;
  pbr: boolean;
  animated: boolean;
  rigged: boolean;
}

@Component({
  selector: 'app-upload-success',
  standalone: true,
  imports: [UserNavbarComponent, FooterComponent],
  templateUrl: './upload-success.component.html',
  styleUrls: ['./upload-success.component.css']
})
export class UploadSuccessComponent {

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  modelId: string | null = null; // To store the model ID from the URL
  model: Model | null = null; // To store the transformed model details

  ngOnInit(): void {
    // Access route parameters
    this.route.paramMap.subscribe((params) => {
      this.modelId = params.get('id'); // Get the 'id' parameter from the URL
      console.log('Model ID from URL:', this.modelId);

      if (this.modelId) {
        const url = `${BASE_url}/vebxrmodel/${this.modelId}`;

        // Fetch and transform data
        this.http.get<any>(url, {withCredentials: true}).subscribe(
          (data) => {
            this.model = this.transformResponse(data);
            console.log('Transformed model:', this.model);
          },
          (error) => {
            console.error('Error fetching model:', error);
          }
        );
      }
    });
  }

  // Transform the API response to match the Model interface
  private transformResponse(response: any): Model {
    const modelData = response.model;
    return {
      title: modelData.title,
      image: modelData.image1Url, // Use the first image as the main image
      name: modelData.title, // Assuming the name is the title
      price: modelData.price, // Format the price as a string
      image1Url: modelData.image1Url,
      discount: modelData.discount || 0, // Default to 0 if not provided
      category: modelData.category?.name || 'Unknown', // Fallback to 'Unknown'
      format: modelData.format,
      polyCount: modelData.parameters?.['Face Count']?.[0]?.toString() || 'N/A', // Extract poly count
      license: modelData.license,
      rating: modelData.review || 0, // Use review or default to 0
      pbr: modelData.parameters?.Valid || false, // Use the Valid property
      animated: false, // Default as this data is not available
      rigged: false // Default as this data is not available
    };
  }
}
