import * as fromProduct from '../_actions/product.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product, Company } from 'src/app/_models';

export interface ProductState extends EntityState<Product> {
    loaded: boolean;
    loading: boolean;
    error: string;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter <Product>({
    selectId: product => product.Id
});

export const defaultProduct: ProductState = {
    ids: [],
    entities: {},
    loaded: false,
    loading: false,
    error: undefined,
};

export const initialstate = productAdapter.getInitialState(defaultProduct);

export function productReducer(state = initialstate, action: fromProduct.ProductAction): ProductState {
    switch (action.type) {
        case fromProduct.LOAD_PRODUCTS_SUCCESS: {
            return productAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                error: undefined
            });
        }
        case fromProduct.LOAD_PRODUCTS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        default:
            return state;
    }
}
