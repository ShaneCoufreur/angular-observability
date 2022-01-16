import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BewertungInputComponent } from './bewertung-input.component';

describe('BewertungInputComponent', () => {
  let component: BewertungInputComponent;
  let fixture: ComponentFixture<BewertungInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BewertungInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BewertungInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
