import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromBewertung from '../bewertung/bewertung.reducer';
import { getUser, userInfoReducer, UserInfoState } from './user-info.reducer';


export interface State {
  userInfo: UserInfoState;
  [fromBewertung.bewertungsFeatureKey]: fromBewertung.State
}

export const reducers: ActionReducerMap<State> = {
  userInfo: userInfoReducer,
  [fromBewertung.bewertungsFeatureKey]: fromBewertung.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectUserInfoState = createFeatureSelector<UserInfoState>('userInfo');
export const selectUserInfo = createSelector(selectUserInfoState, getUser);
export const selectUserName = createSelector(selectUserInfo, user => user?.name);
