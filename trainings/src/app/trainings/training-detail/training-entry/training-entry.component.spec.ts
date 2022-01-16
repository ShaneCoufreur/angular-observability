import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingEntryComponent } from './training-entry.component';

describe('TrainingEntryComponent', () => {
  let component: TrainingEntryComponent;
  let fixture: ComponentFixture<TrainingEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
