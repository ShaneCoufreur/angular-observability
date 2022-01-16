import { createAction, props } from '@ngrx/store';
import { Training } from '../training.model';

export const loadTrainings = createAction(
  '[Training] Load Trainings'
);

export const loadTrainingsSuccess = createAction(
  '[Training] Load Trainings Success',
  props<{ trainings: Training[] }>()
);

export const loadTrainingsFailure = createAction(
  '[Training] Load Trainings Failure',
  props<{ error: string }>()
);
