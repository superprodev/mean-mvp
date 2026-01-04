import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { injectDispatch } from '@reduxjs/angular-redux';
import { signup } from '../../../store/auth-slice';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})

export class Signup {
  isSubmitting = false;
  showPassword = false;
  showConfirm = false;

  plans: Array<{ id: number; name: string; desc: string }> = [
    { id: 10, name: 'Starter', desc: '$10 / month' },
    { id: 25, name: 'Pro', desc: '$25 / month' },
    { id: 50, name: 'Business', desc: '$50 / month' },
  ];

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);

  dispatch = injectDispatch();

  form = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    plan: [10, [Validators.required]],
    privilege: [0, [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    accept: [false, [Validators.requiredTrue]],
  });
   

  get passwordsMatch(): boolean {
    const p = this.form.controls['password'].value ?? '';
    const c = this.form.controls['confirmPassword'].value ?? '';
    return p.length > 0 && p === c;
  }

  submit() {
    if (this.form.invalid || !this.passwordsMatch) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = { ...this.form.value };
    delete (payload as any).confirmPassword;

    // TODO: Call your register API here
    this.http.post("/auth/signup", this.form.value).subscribe((data: any) => {
      this.isSubmitting = false;
      this.dispatch(signup(data.user))
    })
  }
}
