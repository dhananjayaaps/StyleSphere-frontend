import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PaginatorModule } from 'primeng/paginator';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {routes} from "../../app.routes";
import {DialogModule} from "primeng/dialog";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DividerModule} from "primeng/divider";
import {TagModule} from "primeng/tag";
import {AISearchResponse} from "../../domain/models";
import {BASE_url} from "../../app.config";
import {ProgressSpinnerModule} from "primeng/progressspinner";

interface ModelPageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}

interface Model {
  id: number; // Include the ID for toggling likes
  image: string;
  name: string;
  price: string;
  discount: number;
  category: string;
  format: string;
  polyCount: string;
  license: string;
  rating: number;
  pbr: boolean;
  animated: boolean;
  rigged: boolean;
  likesCount: number;
  isLiked: boolean;
  review: number;
  keyword: string;
}

@Component({
  selector: 'app-marketplace-products',
  standalone: true,
  imports: [
    UserNavbarComponent,
    FooterComponent,
    PaginatorModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    DialogModule,
    FloatLabelModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DividerModule,
    TagModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './marketplace-products.component.html',
  styleUrls: ['./marketplace-products.component.css'],
})

export class MarketplaceProductsComponent implements OnInit {
  request!:FormGroup;
  isBrowser = false;
  first: number = 0;
  rows: number = 12;
  searchQuery: string = '';
  selectedCategory: string = 'Any';
  selectedPrice: number = 500;
  selectedFormat: string = 'Any';
  selectedPolyCount: string = 'Any';
  selectedLicense: string = 'Any';
  selectedRating: string = 'Any';
  selectedSort: string = 'Relevance';

  AiSearchResults!: AISearchResponse[] ;

  categories: string[] = ['Any', 'Architectural', 'Character', 'Vehicles', 'Furniture', 'Nature', 'Environment', 'Props', 'Weapons', 'Animals'];
  formats: string[] = ['Any', 'GLB', 'OBJ', 'GLTF'];
  licenses: string[] = [
    'Any', 'CC0', 'CC-BY', 'CC-BY-SA', 'CC-BY-NC', 'CC-BY-NC-SA', 'CC-BY-NC-ND', 'GPL', 'LGPL', 'MIT', 'BSD', 'Proprietary'
  ];
  ratings: string[] = ['Any', '1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
  sortOptions: string[] = ['Relevance', 'Price: Low to High', 'Price: High to Low'];

  constructor(private http: HttpClient, private router: Router,@Inject(PLATFORM_ID) private platformId: object) {}


  filteredModels: Model[] = [];
  paginatedModels: Model[] = [];
  // totalModelRecords: number = this.models.length;
  totalModelRecords: number = 0;
  models: Model[] = [];
  openDialog: boolean = false;

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.applyFilters();
    this.request = new FormGroup({
      query: new FormControl("",[Validators.required]),
    });
  }

  // Model Pagination

  onModelPageChange(event: ModelPageEvent) {
    this.first = event.first || 0;
    this.rows = event.rows || 12;
    this.applyFilters(); // Re-fetch data with updated pagination
  }


  updatePaginatedModels() {
    this.paginatedModels = this.filteredModels.slice(this.first, this.first + this.rows);
  }

  applyFilters() {
    const params: any = {
      category: this.selectedCategory !== 'Any' ? this.selectedCategory : '',
      price: this.selectedPrice !== 500 ? this.selectedPrice : '',
      format: this.selectedFormat !== 'Any' ? this.selectedFormat : '',
      license: this.selectedLicense !== 'Any' ? this.selectedLicense : '',
      rating: this.selectedRating !== 'Any' ? this.selectedRating.charAt(0) : '',
      sort: this.selectedSort,
      page: Math.floor(this.first / this.rows) + 1,
      pageSize: this.rows,
      keyword: this.searchQuery || '', // Pass the search query as a parameter
    };

    // Remove empty parameters
    Object.keys(params).forEach((key) => {
      if (params[key] === '') delete params[key];
    });

    this.http
      .get<{ data: any[]; total: number }>(
        'http://localhost:3000/vebxrmodel/modelsWithLikes',
        {
          params,
          withCredentials: true, // Include credentials with the request
        }
      )
      .subscribe(
        (response) => {
          console.log('Models:', response.data); // Debug log
          this.models = response.data.map((item) => ({
            id: item.id,
            image: item.image1Url || item.image2Url || item.image3Url,
            name: item.title,
            price: `$${item.price}`,
            discount: 0,
            category: item.tags[0] || 'Miscellaneous',
            format: item.format,
            polyCount: 'Unknown',
            license: item.license,
            rating: item.review || 0,
            pbr: false,
            animated: false,
            rigged: false,
            likesCount: item.likesCount,
            isLiked: item.isUserLiked,
            review: item.review || 0,
            keyword: item.keywords || '',
          }));
          this.filteredModels = [...this.models];
          this.totalModelRecords = response.total;
          this.updatePaginatedModels();
        },
        (error) => {
          console.error('Error fetching models:', error);
        }
      );
  }



  toggleLike(model: Model) {
    const likeUrl = model.isLiked
      ? `http://localhost:3000/likes/dislike/${model.id}`
      : `http://localhost:3000/likes/like/${model.id}`;

    this.http.post(likeUrl, {}, { withCredentials: true }).subscribe(
      () => {
        console.log('Like toggled successfully'); // Debug log
        model.isLiked = !model.isLiked;
        model.likesCount += model.isLiked ? 1 : -1;
        console.log(`Model ID: ${model.id}, Is Liked: ${model.isLiked}`);  // Debug log
      },
      (error) => {
        console.error('Error toggling like:', error);
      }
    );
  }


  sortFilteredModels() {
    if (this.selectedSort === 'Price: Low to High') {
      this.filteredModels.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (this.selectedSort === 'Price: High to Low') {
      this.filteredModels.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    } else {
      // Add other sorting logic if needed
    }
  }

  navigateToDescription(modelId: number): void {
    this.router.navigate(['/marketplace-product-description'],{ queryParams: { id: modelId } });
  }

  isLoading=false;
  SearchAI() {
    if (this.request.invalid) {
      console.log('Invalid AI search request');
      return;
    }
    this.isLoading=true;
    this.http.post<AISearchResponse[]>(BASE_url+'/vebxrmodel/searchwithAi', this.request.value).subscribe({
      next: (response) => {
        this.AiSearchResults = response;
        this.isLoading=false;
        console.log(this.AiSearchResults);
      },
      error: (error) => {
        console.error('Error fetching AI search results:', error);
      },
    });

  }

  getSeerveritybyScore(score: number) {

    if (score < 0.3) {
      return 'danger';
    } else if (score < 0.4) {
      return 'warning';
    } else if (score < 0.5) {
      return 'secondary';
    } else if (score < 0.7) {
      return 'info';
    }else {
      return 'success';
    }
  }
  getSerevitybyFrequency(frequency: number) {

    if (frequency < 1) {
      return 'warning';
    } else if (frequency < 2) {
      return 'info';
    }else if (frequency < 3) {
      return 'success';
    }else {
      return 'success';
    }
  }



}
