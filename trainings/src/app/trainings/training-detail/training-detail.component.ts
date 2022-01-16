import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApmBase, Span } from '@elastic/apm-rum';
import { APM } from '@elastic/apm-rum-angular';
import { select, Store } from '@ngrx/store';
import { Transaction } from '@sentry/types';
import * as Sentry from '@sentry/angular';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { addBewertung } from '../../shared/bewertung/bewertung.actions';
import { truthy } from '../../shared/truthyness.helper';
import { selectUserName } from '../../shared/user-info/index';
import { selectTrainingWithBewertung } from '../state/index';
import { TrainingWithBewertung } from '../state/training.model';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingDetailComponent implements OnInit {

  trainingWithBewertung?: Observable<TrainingWithBewertung>;
  bewertungForm = new FormGroup({
    stars: new FormControl(0),
    comment: new FormControl()
  });

  private user?: Observable<string | undefined>;
  private sentryTransaction?: Transaction;
  private apmSpan: Span | undefined;

  constructor(private readonly route: ActivatedRoute,
              @Inject(APM) private readonly apm: ApmBase,
              private readonly store: Store) {
  }

  ngOnInit(): void {
    this.trainingWithBewertung = this.route.paramMap
      .pipe(
        map(params => params.get('id') || ''),
        switchMap(id => this.store.select(selectTrainingWithBewertung(id))),
        filter(truthy),
        tap(() => {
          if (environment.useSentry) {
            this.sentryTransaction?.finish();
            this.sentryTransaction = undefined;
          } else {
            this.apmSpan?.end()
            this.apmSpan = undefined;
          }
          this.bewertungForm.reset();
        })
      );
    this.user = this.store.pipe(select(selectUserName));
  }

  sendFeedback(trainingId: string | undefined): void {
    if (environment.useSentry) {
      this.sentryTransaction = Sentry.startTransaction({name: 'add bewertung'});
      Sentry.getCurrentHub().configureScope(scope => scope.setSpan(this.sentryTransaction));
    } else {
      this.apmSpan = this.apm.startSpan('add bewertung')
    }
    this.user?.pipe(first(truthy))
      .subscribe(name => {
        const bewertung = {
          id: '',
          bewerter: name,
          ...this.bewertungForm.value,
          trainingId
        };
        this.store.dispatch(addBewertung({bewertung}));
      });
  }
}
