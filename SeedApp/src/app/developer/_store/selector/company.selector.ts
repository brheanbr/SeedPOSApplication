import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromFeature from '../reducer';
import * as fromCompany from '../reducer/company.reducer';



const {
    // select the array of user ids
    selectIds,

    // select the dictionary of user entities
    selectEntities,

    // select the array of users
    selectAll,

    // select the total user count
    selectTotal,
  } = fromCompany.companyAdapter.getSelectors();



// select the array of user ids
const selectUserIds = selectIds;

// select the dictionary of user entities
const selectUserEntities = selectEntities;

// select the array of users
const selectAllCompany = selectAll;

// select the total user count
const selectUserTotal = selectTotal;



export const getCompanyState = createSelector(
    fromFeature.getCompanyFeatureState,
    state => state.company
);

export const getCompanies = createSelector(
    getCompanyState,
    selectAllCompany
);
export const getCompany = createSelector(
    getCompanyState,
    state => state.selectedCompany
);
export const getCompanyError = createSelector(
    getCompanyState,
    state => state.error
);
export const getCompanyEntity = (id: string) => createSelector(
    getCompanyState,
    state => state.entities[id]
);
