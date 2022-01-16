import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import langDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveComponentModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BewertungEffects } from './shared/bewertung/bewertung.effects';
import { ModalModule } from './shared/components/modal/modal.module';
import { NavComponent } from './shared/components/nav/nav.component';
import * as fromRoot from './shared/user-info/index';
import { UserInfoEffects } from './shared/user-info/user-info.effects';
import { ApmInitModule, SentryInitModule } from './tracing-init.modules';

registerLocaleData(langDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,

    StoreModule.forRoot(fromRoot.reducers, {
      metaReducers: fromRoot.metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([UserInfoEffects, BewertungEffects]),
    StoreRouterConnectingModule.forRoot(),
    ReactiveComponentModule,

    MatIconModule,

    AppRoutingModule,
    ModalModule,
    environment.useSentry? SentryInitModule : ApmInitModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'de'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
