import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveComponentModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StarsInputModule } from '../shared/components/stars-input/stars-input.module';
import { TrainingEffects } from './state/collection/training.effects';
import * as fromTrainings from './state/index';
import { BewertungInputComponent } from './training-detail/bewertung-input/bewertung-input.component';
import { TrainingDetailComponent } from './training-detail/training-detail.component';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { TrainingsComponent } from './trainings.component';
import { TrainingEntryComponent } from './training-detail/training-entry/training-entry.component';


@NgModule({
  declarations: [
    TrainingsComponent,
    TrainingDetailComponent,
    BewertungInputComponent,
    TrainingEntryComponent
  ],
  imports: [
    CommonModule,
    StarsInputModule,
    TrainingsRoutingModule,
    StoreModule.forFeature(fromTrainings.trainingsFeatureKey, fromTrainings.trainingsReducers),
    EffectsModule.forFeature([TrainingEffects]),
    ReactiveComponentModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class TrainingsModule {
}
