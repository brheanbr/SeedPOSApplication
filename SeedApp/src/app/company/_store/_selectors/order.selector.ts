import * as fromFeature from '../_reducers';
import * as fromOrder from '../_reducers/order.reducer';
import { createSelector } from '@ngrx/store';

const {
    // selectIds,
    selectEntities,
    selectAll,
    // selectTotal
} = fromOrder.orderAdapter.getSelectors();

// const selectUserIds = selectIds;
const selectOrderEntity = selectEntities;
const selectAllOrder = selectAll;


export const getPOSOrderState = createSelector(
    fromFeature.getCompanyFeatureState,
    state => state.orders
);

export const getUnpaidOrders = createSelector(
    getPOSOrderState,
    selectAllOrder
);
export const getLatestOrder = createSelector(
    fromFeature.getCompanyFeatureState,
    state => state.orders.orderToPrint
);

export const getLatestOrderLoaded = createSelector(
    fromFeature.getCompanyFeatureState,
    state => state.orders.loaded
);
