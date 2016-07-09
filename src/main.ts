import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyCZTpv0PW6NizB3KGDkxGgM73qrtz71ZBI",
    authDomain: "ng2bussiness.firebaseapp.com",
    databaseURL: "https://ng2bussiness.firebaseio.com",
    storageBucket: "ng2bussiness.appspot.com",
  })
]);

