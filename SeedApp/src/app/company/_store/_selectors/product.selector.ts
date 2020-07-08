import { createSelector } from '@ngrx/store';
import * as fromFeature from '../_reducers';
import * as fromProduct from '../_reducers/product.reducer';


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


export const getPOSProductState = createSelector(
    fromFeature.getCompanyFeatureState,
    state => state.products
);

export const getPOSProducts = createSelector(
    getPOSProductState,
    selectAllProduct
);

export const getPOSProductError = createSelector(
    getPOSProductState,
    state => state.error
);

export const getPOSProductLoaded = createSelector(
    getPOSProductState,
    state => state.loaded
);
export const getPOSProductLoading = createSelector(
    getPOSProductState,
    state => state.loading
);
