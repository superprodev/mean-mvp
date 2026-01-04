import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    accept: [false, [Validators.requiredTrue]],
  });;
   

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
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('Sign up payload:', payload);
    }, 900);
  }
}
