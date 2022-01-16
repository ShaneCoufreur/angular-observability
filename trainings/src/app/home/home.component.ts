import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { defaultIfEmpty, startWith } from 'rxjs/operators';
import { selectDurchschnittsBewertung } from '../shared/bewertung/bewertung.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  bewertungDurchnitt?: Observable<number>;

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.bewertungDurchnitt = this.store.pipe(
      select(selectDurchschnittsBewertung)
    );
  }

}
