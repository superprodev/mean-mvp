import { Component, signal, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { injectDispatch, injectSelector } from '@reduxjs/angular-redux';
import { RootState } from './store';
import { signout } from './store/auth-slice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  protected readonly title = signal('mean-mvp');

  router = inject(Router);

  auth = injectSelector((state: RootState) => state.auth)
  dispatch = injectDispatch();

  onSignOut(){
    this.dispatch(signout());
    this.router.navigate(["/dashboard"])
  }

}
