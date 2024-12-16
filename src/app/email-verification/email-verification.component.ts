import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for API calls
import { RouterModule } from '@angular/router'; // Import RouterModule for navigation
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule], // Ensure CommonModule is imported
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent {
  @Input() isEmailVerified: boolean = false;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.verifyEmail(token);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No verification token provided.';
    }
  }

  private verifyEmail(token: string): void {
    const apiUrl = `http://localhost:3000/auth/verify-email?token=${token}`;
    this.http.get(apiUrl).subscribe({
      next: () => {
        this.isEmailVerified = true;
        this.isLoading = false;
      },
      error: (err) => {
        this.isEmailVerified = false;
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to verify email. Please try again.';
      },
    });
  }
}
