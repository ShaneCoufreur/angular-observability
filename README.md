# Angular Observability

This project provides some examples for observability with Angular.

The `trainings` folder contains the Angular application, the `trainings-backend` is a NestJS application that serves as a sample backend.

Observability tools used:

* Lighthouse CI (LHCI), run with `run.sh` locally to spawn a docker container with Lighthouse CI or `launch.sh` if you want to run Lighthouse CI directly
* (Cypress as test driver)
* Sentry (configure with environment.ts, useSentry=true)
* Elastic APM (configure with environment.ts, useSentry=false)
