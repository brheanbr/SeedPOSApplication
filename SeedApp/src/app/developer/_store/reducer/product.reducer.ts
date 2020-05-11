import * as fromProduct from '../actions/product.action';
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
        case fromProduct.LOAD_COMPANY_PRODUCTS_SUCCESS: {
            return productAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                error: undefined
            });
        }
        case fromProduct.LOAD_COMPANY_PRODUCTS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        case fromProduct.ADD_COMPANY_PRODUCT: {
            return {
                ...state,
                loading: true,
                loaded: false,
            };
        }
        case fromProduct.ADD_COMPANY_PRODUCT_SUCCESS: {
            return productAdapter.addOne(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                error: undefined
            });
        }
        case fromProduct.ADD_COMPANY_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload,
            };
        }
        case fromProduct.EDIT_COMPANY_PRODUCT: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: undefined
            };
        }
        case fromProduct.EDIT_COMPANY_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload,
            };
        }
        case fromProduct.EDIT_COMPANY_PRODUCT_SUCCESS: {
            return productAdapter.updateOne(action.payload, state);
        }

        case fromProduct.DELETE_COMPANY_PRODUCT_SUCCESS: {
            return productAdapter.removeOne(action.payload, state)
        }

        default:
            return state;
    }
}

// export interface ItemState {
//     product: ProductState;
// }

// export const productTeducer: ActionReducerMap<ItemState> = {
//     product: productReducer,
// };

// export const getProductFeatureState = createFeatureSelector<ItemState>('products');
