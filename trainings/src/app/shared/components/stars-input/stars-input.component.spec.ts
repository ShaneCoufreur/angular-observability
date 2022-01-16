import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsInputComponent } from './stars-input.component';

describe('StarsInputComponent', () => {
  let component: StarsInputComponent;
  let fixture: ComponentFixture<StarsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
