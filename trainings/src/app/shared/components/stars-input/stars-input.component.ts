import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type StarRating = 0 | 1 | 2 | 3 | 4 | 5;

@Component({
  selector: 'lib-stars-input',
  templateUrl: './stars-input.component.html',
  styleUrls: ['./stars-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarsInputComponent),
    multi: true
  }]
})
export class StarsInputComponent implements ControlValueAccessor {

  currentRating: StarRating = 0;
  private disabled = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  @Input() set staticRating(rating: StarRating) {
    this.currentRating = rating;
    this.disabled = true;
  }

  writeValue(rating: StarRating | null): void {
    this.currentRating = rating ?? 0;
    this.cd.markForCheck();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  hover(rating: 0 | 1 | 2 | 3 | 4 | 5): void {
    if (!this.disabled) {
      this.currentRating = rating;
    }
  }

  emitRating(): void {
    if (!this.disabled) {
      this.onChange(this.currentRating);
    }
  }

  private onChange: (_: StarRating) => void = () => undefined;

  private onTouched: (_: any) => void = () => undefined;

}
