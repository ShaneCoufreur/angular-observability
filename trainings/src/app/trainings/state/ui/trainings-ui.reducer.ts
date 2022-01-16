import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as TrainingActions from '../collection/training.actions';


export const trainingsUiFeatureKey = 'ui';

export interface TrainingsUIState {
  error?: string;
  loading?: boolean;
}

export const initialState: TrainingsUIState = {};


export const reducer = createReducer(
  initialState,
  on(TrainingActions.loadTrainings, () => ({loading: true})),
  on(TrainingActions.loadTrainingsSuccess, () => ({})),
  on(TrainingActions.loadTrainingsFailure, (state, action) => ({error: action.error}))
);

export const getTrainingLoading = (state: TrainingsUIState) => !!state.loading;
export const getTrainingError = (state: TrainingsUIState) => state.error;
