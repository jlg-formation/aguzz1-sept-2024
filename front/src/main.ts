import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { isDevMode } from '@angular/core';

if (!isDevMode()) {
  console.log = () => {};
  console.error = () => {};
  console.warn = () => {};
}

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
