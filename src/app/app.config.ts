import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { provideRedux } from '@reduxjs/angular-redux';
import { store } from './store';
import { baseUrlInterceptor } from './http/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withJsonpSupport(), withFetch(), withInterceptors([baseUrlInterceptor])),
    provideRedux({ store })
]
};
