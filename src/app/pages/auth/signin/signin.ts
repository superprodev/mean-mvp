import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signin',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

  isSubmitting = false;
  showPassword = false;
  
  http = inject(HttpClient);
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true],
  });;

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // TODO: Call your auth API here
    setTimeout(() => {
      this.http.get("http://localhost:8000/test").subscribe((data) => {
        console.log(data);
      });
      this.isSubmitting = false;
      console.log('Sign in payload:', this.form.value);
    }, 800);
  }
}
