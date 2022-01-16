import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Bewertung } from '../../../shared/bewertung/bewertung.model';
import { TrainingWithBewertung } from '../../state/training.model';

@Component({
  selector: 'app-training-entry',
  templateUrl: './training-entry.component.html',
  styleUrls: ['./training-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingEntryComponent {

  @Input() training?: TrainingWithBewertung;

  isbiggerthan0(num: number): boolean {
    console.log('bllablblal', num);
    return num > 0;
  }

  trackById(index: number, bew: Bewertung): string {
    return bew.id;
  }
}
