import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, concatMap, map, startWith, switchMap, tap } from 'rxjs/operators';
import { ModalService } from '../components/modal/modal.service';
import { addBewertung, addBewertungFailure, addBewertungSuccess, loadBewertungs } from './bewertung.actions';
import { BewertungService } from './bewertung.service';


@Injectable()
export class BewertungEffects {

  loadBewertungen = createEffect(() => this.actions$
    .pipe(
      ofType(addBewertungSuccess),
      startWith({type: 'dummy'}),
      switchMap(() => {
        return this.bewertungService.getBewertungen()
          .pipe(
            map(bewertungs => loadBewertungs({bewertungs})),
            catchError(err => of(loadBewertungs({bewertungs: []})))
          );
      })
    )
  );

  addBewertung = createEffect(() => this.actions$.pipe(
    ofType(addBewertung),
    concatMap(({bewertung}) => this.bewertungService.addBewertung(bewertung)
      .pipe(
        // switchMap(res => Math.random() < 0.8 ? of(res) : throwError(new Error('Bewertung: An error happened'))),
        map(bew => addBewertungSuccess({bewertung})),
        catchError(err => of(addBewertungFailure({error: err.message})))
      )
    )
  ));

  bewertungFailure = createEffect(() => this.actions$.pipe(
    ofType(addBewertungFailure),
    tap(action => this.modalService.openErrorModal(action.error))
  ), {dispatch: false});


  constructor(private actions$: Actions,
              private modalService: ModalService,
              private bewertungService: BewertungService) {
  }

}
