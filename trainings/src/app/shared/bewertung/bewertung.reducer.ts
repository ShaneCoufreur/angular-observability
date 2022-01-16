import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as BewertungActions from './bewertung.actions';
import { Bewertung } from './bewertung.model';

export const bewertungsFeatureKey = 'bewertungs';

export interface State extends EntityState<Bewertung> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Bewertung> = createEntityAdapter<Bewertung>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(BewertungActions.loadBewertungs,
    (state, action) => adapter.setAll(action.bewertungs, state)
  ),
  on(BewertungActions.addBewertungSuccess,
    (state, action) => adapter.addOne(action.bewertung, state)
  ),







  on(BewertungActions.upsertBewertung,
    (state, action) => adapter.upsertOne(action.bewertung, state)
  ),
  on(BewertungActions.addBewertungs,
    (state, action) => adapter.addMany(action.bewertungs, state)
  ),
  on(BewertungActions.upsertBewertungs,
    (state, action) => adapter.upsertMany(action.bewertungs, state)
  ),
  on(BewertungActions.updateBewertung,
    (state, action) => adapter.updateOne(action.bewertung, state)
  ),
  on(BewertungActions.updateBewertungs,
    (state, action) => adapter.updateMany(action.bewertungs, state)
  ),
  on(BewertungActions.deleteBewertung,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(BewertungActions.deleteBewertungs,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(BewertungActions.clearBewertungs,
    state => adapter.removeAll(state)
  )
);

export const selectBewertungsFeature = createFeatureSelector<State>(bewertungsFeatureKey);

export const {
  selectEntities: selectBewertungEntities,
  selectAll: selectAllBewertungen
} = adapter.getSelectors(selectBewertungsFeature);

export const selectDurchschnittsBewertung = createSelector(
  selectAllBewertungen,
  bewertungen => bewertungen.reduce((prev, curr) => prev + curr.stars, 0) / bewertungen.length
);
