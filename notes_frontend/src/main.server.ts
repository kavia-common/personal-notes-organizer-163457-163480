import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * PUBLIC_INTERFACE
 * Default SSR bootstrap function for Angular server-side rendering.
 * Must return Promise<ApplicationRef> for Angular 19 SSR compatibility.
 */
const bootstrap = (): Promise<ApplicationRef> => bootstrapApplication(AppComponent, config);

export default bootstrap;
