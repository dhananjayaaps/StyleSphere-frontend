import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit {
  isEmailVerified: boolean = false; // Determines if the email was successfully verified
  isLoading: boolean = true; // Indicates if the verification process is ongoing
  errorMessage: string | null = null; // Stores any error message if verification fails

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Extract the token from the query parameters
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
        // On success, set email as verified
        this.isEmailVerified = true;
        this.isLoading = false;
      },
      error: (err) => {
        // Handle errors and show failure UI
        this.isEmailVerified = false;
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Failed to verify email. Please try again.';
      },
    });
  }
}
