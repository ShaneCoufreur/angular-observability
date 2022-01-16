import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular';
import { ApmErrorHandler, ApmModule, ApmService } from '@elastic/apm-rum-angular';


@NgModule({
  declarations: [],
  providers: [
    ApmService,
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler
    }
  ],
  imports: [
    ApmModule
  ]
})
export class ApmInitModule {
  constructor(service: ApmService) {
    const apm = service.init({
      serviceName: 'monitoring-demo-app',
      distributedTracing: true,
      distributedTracingOrigins: ['http://localhost:3000'],
      serverUrl: 'http://localhost:8200'
    });

    apm.setUserContext({
      'username': 'foo',
      'id': 'bar'
    });
  }
}

@NgModule({
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true
      })
    },
    {
      provide: Sentry.TraceService,
      deps: [Router]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
      },
      deps: [Sentry.TraceService],
      multi: true
    }
  ]
})
export class SentryInitModule {
}
