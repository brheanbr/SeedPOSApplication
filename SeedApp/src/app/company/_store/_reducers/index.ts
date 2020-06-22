import * as fromProduct from './product.reducers';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
export * from './product.reducers';

export interface ProductState {
    products: fromProduct.ProductState;
}

export const reducers: ActionReducerMap<ProductState> = {
    products: fromProduct.productReducer
};

export const getCompanyFeatureState = createFeatureSelector<ProductState>('products');
