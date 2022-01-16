import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ModalService } from '../components/modal/modal.service';
import { loadUserInfosFailure, loadUserInfosSuccess } from './user-info.actions';
import { UserInfoService } from './user-info.service';


@Injectable()
export class UserInfoEffects {

  loadUsers = createEffect(() => this.userService.getUserInfo()
    .pipe(
      map(user => loadUserInfosSuccess({user})),
      catchError(err => of(loadUserInfosFailure({error: err.message})))
    )
  );

  loadUserFailure = createEffect(() => this.actions$.pipe(
    ofType(loadUserInfosFailure),
    tap(action => this.modalService.openErrorModal(action.error))
  ), {dispatch: false});

  constructor(private actions$: Actions,
              private modalService: ModalService,
              private userService: UserInfoService) {
  }
}
