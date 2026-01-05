import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { injectDispatch, injectSelector } from '@reduxjs/angular-redux';
import { RootState } from '../../../store';
import { fetchUsers } from '../../../store/chat-slice';
import { UserState, initialState } from '../../../store/auth-slice';

import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit {
  router = inject(Router);
  http = inject(HttpClient);
  socket : Socket | null = null;

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

  connect(){
    if(this.socket) return;

    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      auth: { email: this.email() },
    });

    this.socket.on("message:new", ({ message }) => {
      console.log(message);
    })

    this.socket.on('connect', () => {
      console.log('socket connected', this.socket!.id);

      this.socket!.emit('conversation:open', {
        convId: '342343u',
        participant: this.selectedUser().email,
      });
    });
  }

  onSend(input: HTMLInputElement){
    this.connect();

    if(this.socket?.connected){
      this.socket!.emit("message:send", { convId: "342343u", to: this.selectedUser().email, content: input.value})
    }
    input.value = "";
  }

  onSelect(user: UserState){
    this.selectedUser.set(user);
  }
}
