import { ApplicationRef, enableProdMode } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if(environment.useSentry) {
  Sentry.init({
    dsn: 'https://<your-id>.ingest.sentry.io/<project-id>',
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ['localhost', 'http://localhost:3000'],
        routingInstrumentation: Sentry.routingInstrumentation
      })
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  });
}

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(moduleRef => {
      const applicationRef = moduleRef.injector.get(ApplicationRef);
      const appComponent = applicationRef.components[0];
      enableDebugTools(appComponent);
    })
    .catch(err => console.error(err));
});
