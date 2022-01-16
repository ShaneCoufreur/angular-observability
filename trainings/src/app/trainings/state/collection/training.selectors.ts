import { TrainingCollectionState } from './training.reducer';


export const getTraining = (trainingId: string) => {
  console.log('create selector for id: ', trainingId)
  return (state: TrainingCollectionState) => state.trainingsMap[trainingId];
};
export const getTrainingsMap = (state: TrainingCollectionState) => state.trainingsMap;
