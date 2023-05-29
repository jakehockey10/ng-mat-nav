import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  enableIndexedDbPersistence,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      // enabled: true,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: 'AIzaSyCAMq2YVB8tgCWhdmEZia0ybmcXhWn5_LA',
          authDomain: 'jakehockey10-fireship.firebaseapp.com',
          projectId: 'jakehockey10-fireship',
          storageBucket: 'jakehockey10-fireship.appspot.com',
          messagingSenderId: '732909788878',
          appId: '1:732909788878:web:f5e56e03e85c35b3dc3a9f',
          measurementId: 'G-KK67Y2J796',
        })
      ),
      provideAuth(() => getAuth()),
      provideFirestore(() =>
        initializeFirestore(getApp(), {
          localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
          }),
        })
      ),
      provideStorage(() => getStorage())
    ),
  ],
};
