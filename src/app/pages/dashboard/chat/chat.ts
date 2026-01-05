import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { injectDispatch, injectSelector } from '@reduxjs/angular-redux';
import { RootState } from '../../../store';
import { fetchUsers } from '../../../store/chat-slice';
import { UserState, initialState } from '../../../store/auth-slice';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  router = inject(Router);
  http = inject(HttpClient);

  selectedUser = signal<UserState>(initialState);

  dispatch = injectDispatch();
  users = injectSelector((state: RootState) => state.chat.users);
  messages = injectSelector((state: RootState) => state.chat.messages);
  email = injectSelector((state: RootState) => state.auth.email);
  

  ngOnInit(): void {
    this.http.post("/auth/users", { email: this.email() }).subscribe((data: any) => {
      if(data.success){
        this.dispatch(fetchUsers(data.users));
        this.selectedUser.set(data.users[0]);
      }
    });
  }

  onSend(){
    
  }
}
