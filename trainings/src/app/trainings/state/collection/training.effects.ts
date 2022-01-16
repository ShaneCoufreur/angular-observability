import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, delay, map, startWith } from 'rxjs/operators';
import { addBewertungSuccess } from '../../../shared/bewertung/bewertung.actions';
import * as TrainingActions from './training.actions';
import { TrainingService } from './training.service';

@Injectable()
export class TrainingEffects {

  loadTrainings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrainingActions.loadTrainings, addBewertungSuccess),
      startWith(TrainingActions.loadTrainings()),
      concatMap(() =>
        this.trainingService.getTrainings()
          .pipe(
            delay(2000),
            map(trainings => TrainingActions.loadTrainingsSuccess({trainings})),
            catchError(error => of(TrainingActions.loadTrainingsFailure({error: error.message})))
          )
      )
    );
  });

  constructor(private actions$: Actions, private trainingService: TrainingService) {
  }
}

