import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, FloatLabelModule, InputTextareaModule,RatingModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  visibleRegister: boolean = false;

  formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
          heading: new FormControl<string | null>(null),
          review : new FormControl<string | null>(null),
          rating: new FormControl<number | null>(null)
        });
    }

  showRegister() {
      this.visibleRegister = true;
  }
}
