import * as fromCompany from './company.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductState {
    company: fromCompany.CompanyState;
}

export const reducers: ActionReducerMap<ProductState> = {
    company: fromCompany.reducer,
};

export const getProductState = createFeatureSelector<ProductState>('products');


// company state
export const getCompanyState = createSelector(getProductState, (state: ProductState) => state.company);


export const getCompany = createSelector(getCompanyState, fromCompany.getCompany);
export const getCompanyLoaded = createSelector(getCompanyState, fromCompany.getCompany);
export const getCompanyLoding = createSelector(getCompanyState, fromCompany.getCompanyLoading);
