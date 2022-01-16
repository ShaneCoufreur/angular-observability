import { Bewertung } from '../../shared/bewertung/bewertung.model';

export interface Training {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  trainer: Trainer;
}

export interface Trainer {
  name: string;
  fields: string[];
}

export interface TrainingWithBewertung extends Training {
  bewertungen?: Bewertung[];
}
