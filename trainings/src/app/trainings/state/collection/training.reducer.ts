import { Dictionary } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Training } from '../training.model';
import * as TrainingActions from './training.actions';

export const trainingCollectionFeatureKey = 'collection';

export interface TrainingCollectionState {
  ids: string[];
  trainingsMap: Dictionary<Training>;
}

export const initialState: TrainingCollectionState = {
  ids: [],
  trainingsMap: {}
};

export const reducer = createReducer(
  initialState,
  on(TrainingActions.loadTrainings, () => initialState),
  on(TrainingActions.loadTrainingsSuccess, (state, action) => {
    const ids: string[] = [];
    const trainingsMap: Dictionary<Training> = {};
    action.trainings.forEach(training => {
      ids.push(training.id);
      trainingsMap[training.id] = training;
    });
    return {ids, trainingsMap};
  })
);

