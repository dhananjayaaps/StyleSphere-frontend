import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  imports: [
    RouterOutlet,
    RouterModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent {
  newPasswordForm: FormGroup;
  visibleResetPassword: boolean = false; // Controls the visibility of the popup

  constructor(private fb: FormBuilder, private router: Router) {
    this.newPasswordForm = this.fb.group(
      {
        newPassword: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Validator to ensure passwords match
  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  // Method to handle password change
  onChangePassword() {
    if (this.newPasswordForm.valid) {
      console.log('Password successfully changed.');
      this.visibleResetPassword = true;
    } else {
      this.newPasswordForm.markAllAsTouched();
    }
  }

  // Method to hide the popup
  hideResetPassword() {
    this.visibleResetPassword = false;
  }

  // Redirect to home page
  redirectToHome() {
    this.router.navigate(['/home']);
  }
}
