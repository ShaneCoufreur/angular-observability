import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StarsInputComponent } from './stars-input.component';


@NgModule({
  declarations: [StarsInputComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [StarsInputComponent]
})
export class StarsInputModule {
}
