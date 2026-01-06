import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { injectDispatch, injectSelector } from '@reduxjs/angular-redux';
import { RootState } from '../../../store';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {

  http = inject(HttpClient);
  router = inject(Router);

  dispatch = injectDispatch();
  users = injectSelector((state: RootState) => state.chat.users);

}
