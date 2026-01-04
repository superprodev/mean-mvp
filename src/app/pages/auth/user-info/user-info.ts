import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, effect, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { injectDispatch, injectSelector } from '@reduxjs/angular-redux';
import { update } from '../../../store/auth-slice';
import { RootState } from '../../../store';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  isSubmitting = signal(false);
  showPassword = false;

  plans: Array<{ id: number; name: string; desc: string }> = [
    { id: 10, name: 'Starter', desc: '$10 / month' },
    { id: 25, name: 'Pro', desc: '$25 / month' },
    { id: 50, name: 'Business', desc: '$50 / month' },
  ];

  formBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  user = injectSelector((state: RootState) => state.auth);

  dispatch = injectDispatch();

  form = this.formBuilder.group({
    firstname: [this.user().firstname, [Validators.required, Validators.minLength(2)]],
    lastname: [this.user().lastname, [Validators.required, Validators.minLength(2)]],
    email: [this.user().email, [Validators.required, Validators.email]],
    plan: [this.user().plan, [Validators.required]],
    balance: [this.user().balance],
    privilege: [this.user().privilege, [Validators.required]],
    password: [this.user().password, [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const payload = { ...this.form.value };
    delete (payload as any).confirmPassword;

    // TODO: Call your register API here
    this.http.post("/auth/update", this.form.value).subscribe((data: any) => {
      this.isSubmitting.set(false);
      if(data.success){
        this.dispatch(update(data.user))
      }
    })
  }
}
