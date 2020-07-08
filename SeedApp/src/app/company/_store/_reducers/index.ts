import * as fromProduct from './product.reducer';
import * as fromOrder from './order.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface POSState {
    products: fromProduct.ProductState;
    orders: fromOrder.OrderState;
}

export const reducers: ActionReducerMap<POSState> = {
    products: fromProduct.productReducer,
    orders: fromOrder.orderReducer
};

export const getCompanyFeatureState = createFeatureSelector<POSState>('pos');
