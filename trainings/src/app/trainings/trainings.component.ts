import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTrainings } from './state/collection/training.actions';
import { selectTrainingsErrors, selectTrainingsLoading, selectTrainingsWithBewertungen } from './state/index';
import { TrainingWithBewertung } from './state/training.model';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingsComponent implements OnInit {
  trainingsWithBewertungen?: Observable<TrainingWithBewertung[]>;
  error?: Observable<string | undefined>;
  loading?: Observable<boolean>;

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadTrainings());
    this.trainingsWithBewertungen = this.store.select(selectTrainingsWithBewertungen);
    this.error = this.store.select(selectTrainingsErrors);
    this.loading = this.store.select(selectTrainingsLoading);
  }

  trackById(index: number, training: TrainingWithBewertung): string {
    return training.id;
  }
}
