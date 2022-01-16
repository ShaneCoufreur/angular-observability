import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Bewertung } from './bewertung.model';

export const loadBewertungs = createAction(
  '[Bewertung/API] Load Bewertungs',
  props<{ bewertungs: Bewertung[] }>()
);

export const addBewertung = createAction(
  '[Bewertung/API] Add Bewertung',
  props<{ bewertung: Bewertung }>()
);
export const addBewertungSuccess = createAction(
  '[Bewertung/API] Add Bewertung Success',
  props<{ bewertung: Bewertung }>()
);
export const addBewertungFailure = createAction(
  '[Bewertung/API] Add Bewertung Error',
  props<{ error: string }>()
);

export const upsertBewertung = createAction(
  '[Bewertung/API] Upsert Bewertung',
  props<{ bewertung: Bewertung }>()
);

export const addBewertungs = createAction(
  '[Bewertung/API] Add Bewertungs',
  props<{ bewertungs: Bewertung[] }>()
);

export const upsertBewertungs = createAction(
  '[Bewertung/API] Upsert Bewertungs',
  props<{ bewertungs: Bewertung[] }>()
);

export const updateBewertung = createAction(
  '[Bewertung/API] Update Bewertung',
  props<{ bewertung: Update<Bewertung> }>()
);

export const updateBewertungs = createAction(
  '[Bewertung/API] Update Bewertungs',
  props<{ bewertungs: Update<Bewertung>[] }>()
);

export const deleteBewertung = createAction(
  '[Bewertung/API] Delete Bewertung',
  props<{ id: string }>()
);

export const deleteBewertungs = createAction(
  '[Bewertung/API] Delete Bewertungs',
  props<{ ids: string[] }>()
);

export const clearBewertungs = createAction(
  '[Bewertung/API] Clear Bewertungs'
);
