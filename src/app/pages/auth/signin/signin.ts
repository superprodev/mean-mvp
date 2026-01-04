import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { injectDispatch } from '@reduxjs/angular-redux';
import { signin } from '../../../store/auth-slice';


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
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  dispatch = injectDispatch();

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
    this.http.post("/auth/signin", this.form.value).subscribe((data: any) => {
      this.isSubmitting = false;
      this.dispatch(signin(data.user));
      this.router.navigate(["/dashboard"]);
    });
  }
}
