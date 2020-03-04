import * as fromCompany from './company.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterStateSnapshot } from '@angular/router';

export interface ProductState {
    company: fromCompany.CompanyState;
}

export const reducers: ActionReducerMap<ProductState> = {
    company: fromCompany.companyreducer,
};

export const getCompanyFeatureState = createFeatureSelector<ProductState>('companies');


export const {
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
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllCompany = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;





// // company state
// export const getCompanyState = createSelector(getCompanyFeatureState, (state: ProductState) => state.company);


// export const getCompanyEntities = createSelector(getCompanyState, fromCompany.getCompanyEntities);
// export const getAllCompany = createSelector(
//     getCompanyEntities,
//     (entities) => {
//         return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
//     }
//     );


// export const getCompanyLoaded = createSelector(getCompanyState, fromCompany.getCompanyLoaded);
// export const getCompanyLoding = createSelector(getCompanyState, fromCompany.getCompanyLoading);

// export const addCompany = createSelector(getCompanyEntities, fromCompany.addCompany);
// export const addCompanyLoaded = createSelector(getCompanyFeatureState, fromCompany.addCompanyLoaded);
// export const addCompanyLoding = createSelector(getCompanyFeatureState, fromCompany.addCompanyLoading);
