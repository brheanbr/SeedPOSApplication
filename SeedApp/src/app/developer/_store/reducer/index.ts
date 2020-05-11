import * as fromCompany from './company.reducer';
import * as fromProduct from './product.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterStateSnapshot } from '@angular/router';
export * from './company.reducer';
export * from './product.reducer';

export interface ProductState {
    company: fromCompany.CompanyState;
    products: fromProduct.ProductState;
}

export const reducers: ActionReducerMap<ProductState> = {
    company: fromCompany.companyreducer,
    products: fromProduct.productReducer
};

export const getCompanyFeatureState = createFeatureSelector<ProductState>('companies');


// export const {
//     // select the array of user ids
//     selectIds,

//     // select the dictionary of user entities
//     selectEntities,

//     // select the array of users
//     selectAll,

//     // select the total user count
//     selectTotal,
//   } = fromCompany.companyAdapter.getSelectors();



// // select the array of user ids
// export const selectUserIds = selectIds;

// // select the dictionary of user entities
// export const selectUserEntities = selectEntities;

// // select the array of users
// export const selectAllCompany = selectAll;

// // select the total user count
// export const selectUserTotal = selectTotal;





