import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducer';
import * as fromProduct from '../reducer/product.reducer';


const {
    // select the array of user ids
    selectIds,

    // select the dictionary of user entities
    selectEntities,

    // select the array of users
    selectAll,

    // select the total user count
    selectTotal,
  } = fromProduct.productAdapter.getSelectors();



// select the array of user ids
const selectUserIds = selectIds;

// select the dictionary of user entities
const selectUserEntities = selectEntities;

// select the array of users
const selectAllProduct = selectAll;

// select the total user count
const selectUserTotal = selectTotal;


export const getProductState = createSelector(
    fromFeature.getCompanyFeatureState,
    state => state.products
);

export const getProducts = createSelector(
    getProductState,
    selectAllProduct
);

export const getProductError = createSelector(
    getProductState,
    state => state.error
);

export const getProductLoaded = createSelector(
    getProductState,
    state => state.loaded
);
export const getProductLoading = createSelector(
    getProductState,
    state => state.loading
);
export const getProductEntity = (id: string) => createSelector(
    getProductState,
    state => state.entities[id]
);
