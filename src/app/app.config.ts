import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const firebaseConfig = {
  apiKey: "AIzaSyAIMRnb4pDIFU5lJC3FFqGjJdCZ9Hr78zk",
  authDomain: "modeloparcial-7e811.firebaseapp.com",
  projectId: "modeloparcial-7e811",
  storageBucket: "modeloparcial-7e811.appspot.com",
  messagingSenderId: "785815682679",
  appId: "1:785815682679:web:10a12fb3a2ca6e30cc1072",
  measurementId: "G-FP0MMDVHGM"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    {provide:FIREBASE_OPTIONS,
      useValue:firebaseConfig
      
    }
  ]
};
