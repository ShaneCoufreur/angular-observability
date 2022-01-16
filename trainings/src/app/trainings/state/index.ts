import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { Bewertung } from '../../shared/bewertung/bewertung.model';
import { selectAllBewertungen } from '../../shared/bewertung/bewertung.reducer';
import { truthy } from '../../shared/truthyness.helper';
import * as fromTraining from './collection/training.reducer';
import { trainingCollectionFeatureKey } from './collection/training.reducer';
import { getTraining, getTrainingsMap } from './collection/training.selectors';
import { TrainingWithBewertung } from './training.model';
import * as fromTrainingsUi from './ui/trainings-ui.reducer';
import { getTrainingError, getTrainingLoading, trainingsUiFeatureKey } from './ui/trainings-ui.reducer';

export const trainingsFeatureKey = 'trainings';

export interface TrainingsState {
  [fromTraining.trainingCollectionFeatureKey]: fromTraining.TrainingCollectionState;
  [fromTrainingsUi.trainingsUiFeatureKey]: fromTrainingsUi.TrainingsUIState;
}

export const trainingsReducers: ActionReducerMap<TrainingsState> = {
  [fromTraining.trainingCollectionFeatureKey]: fromTraining.reducer,
  [fromTrainingsUi.trainingsUiFeatureKey]: fromTrainingsUi.reducer
};


export const selectTrainingState = createFeatureSelector<TrainingsState>(trainingsFeatureKey);
export const selectTrainingCollectionState = createSelector(selectTrainingState, state => state[trainingCollectionFeatureKey]);
export const selectTrainingUIState = createSelector(selectTrainingState, state => state[trainingsUiFeatureKey]);

export const selectTrainingsLoading = createSelector(selectTrainingUIState, getTrainingLoading);
export const selectTrainingsErrors = createSelector(selectTrainingUIState, getTrainingError);
export const selectTrainingsMap = createSelector(selectTrainingCollectionState, getTrainingsMap);
export const selectTraining = (id: string) => createSelector(selectTrainingCollectionState, getTraining(id));

export const selectTrainingWithBewertung = (id: string) => createSelector(selectTraining(id), selectAllBewertungen,
  (training, bewertungen) => {
    if (!training) {
      return training;
    }
    let trainingWithBewertung: TrainingWithBewertung = training;
    bewertungen.forEach(bewertung => {
      if (trainingWithBewertung.id !== bewertung.trainingId) {
        return;
      }
      trainingWithBewertung = upsertBewertungToTraining(bewertung, trainingWithBewertung);
    });
    return trainingWithBewertung;
  }
);

export const selectTrainingsWithBewertungen = createSelector(selectAllBewertungen, selectTrainingsMap,
  (bewertungen, trainingsMap): TrainingWithBewertung[] => {
    const trainingsWithBewertungMap = {...trainingsMap};
    bewertungen.forEach(bewertung => {
      const trainingWithBew = trainingsWithBewertungMap[bewertung.trainingId];
      if (!trainingWithBew) {
        return;
      }
      trainingsWithBewertungMap[bewertung.trainingId] =
        upsertBewertungToTraining(bewertung, trainingWithBew);
    });
    return Object.values(trainingsWithBewertungMap).filter(truthy);
  }
);


function upsertBewertungToTraining(bewertung: Bewertung, trainingWithBewertung: TrainingWithBewertung): TrainingWithBewertung {
  if (trainingWithBewertung.bewertungen) {
    trainingWithBewertung.bewertungen.push(bewertung);
    return trainingWithBewertung;
  }
  return {...trainingWithBewertung, bewertungen: [bewertung]};
}
