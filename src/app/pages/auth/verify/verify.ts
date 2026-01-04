import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { injectDispatch, injectSelector } from '@reduxjs/angular-redux';
import { RootState } from '../../../store';
import { signin } from '../../../store/auth-slice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  imports: [],
  templateUrl: './verify.html',
  styleUrl: './verify.css',
})
export class Verify implements OnInit {
 
  sent = signal(false);
  code = signal("");
  
  http = inject(HttpClient);
  router = inject(Router)

  auth = injectSelector((state: RootState) => state.auth);
  dispatch = injectDispatch();

  ngOnInit(){
    if(this.auth().verified){
      this.router.navigate(["/dashboard"]);
    }
  }

  onValueChange(event: Event){
    let target = event.target as HTMLInputElement;
    this.code.set(target.value);
  }

  onConfirm(){
    this.http.post("/auth/verify-code", { email: this.auth().email, code: this.code() }).subscribe((data: any) => {
      if(data.success){
        this.dispatch(signin(data.user));
        this.router.navigate(["/dashboard"]);
      }
    })
  }

  onSend(){
    this.http.post("/auth/send-code", { email: this.auth().email }).subscribe((data: any) => {
      this.sent.set(data.success === true);
    })
  }
}
