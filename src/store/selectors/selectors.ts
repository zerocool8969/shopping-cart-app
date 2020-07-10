import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state';

export const selectFeatureCategory = (state: AppState) => state.category;
export const selectFeatureProduct = (state: AppState) => state.product;
 
export const selectFeatureCategoryCount = createSelector(
  selectFeatureCategory,
  (state) => state
);

export const selectFeatureProductCount = createSelector(
  selectFeatureProduct,
  (state) => state
);