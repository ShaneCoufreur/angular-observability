import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Bewertung } from '../../../shared/bewertung/bewertung.model';

@Component({
  selector: 'app-bewertung-input',
  templateUrl: './bewertung-input.component.html',
  styleUrls: ['./bewertung-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BewertungInputComponent {

  @Input() bewertungForm?: FormGroup;
  @Output() emitBewertung = new EventEmitter<void>();

}
