// src/app/redux/persist.init.ts
import { provideAppInitializer } from '@angular/core';
import type { Persistor } from 'redux-persist';
import { persistor } from './index';

function waitForRehydrate(p: Persistor) {
  return () =>
    new Promise<void>((resolve) => {
      const unsub = p.subscribe(() => {
        if (p.getState().bootstrapped) {
          unsub();
          resolve();
        }
      });
    });
}

export const provideReduxPersistInit = () =>
  provideAppInitializer(waitForRehydrate(persistor));
