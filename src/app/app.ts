import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { injectSelector } from '@reduxjs/angular-redux';
import { RootState } from './store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class App {
  protected readonly title = signal('mean-mvp');

  signed = injectSelector((state: RootState) => state.auth.signed)

}
