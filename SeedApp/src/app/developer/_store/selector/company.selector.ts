import { createSelector, props, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../_store';
import * as fromFeature from '../reducer';
import * as fromCompany from '../reducer/company.reducer';
import { Dictionary } from '@ngrx/entity';
import { Company } from 'src/app/_models/company';
import { create } from 'domain';


// export const getCompanyEntities = createSelector(fromFeature.getCompanyFeatureState, (state: fromCompany.CompanyState) => state.entities);

// export const getCompanyEntities = createSelector(
//     getCompanyState,
//     fromCompany.getCompanyEntities,
//     (state: fromCompany.CompanyState) => state.entities[getCompany.]
// );

export const getCompanyFeatureState = createSelector(
    fromFeature.getCompanyFeatureState,
    state => state.company
);

export const getCompanies = createSelector(
    getCompanyFeatureState,
    fromFeature.selectAllCompany
);
export const getCompany = createSelector(
    getCompanyFeatureState,
    state => state.selectedCompany
);


// export const getCompaniesLoading = createSelector(
//     fromFeature.getCompanyFeatureState,
//     (state: fromFeature.ProductState) => fromCompany.getCompanyLoading
// );

// export const getCompaniesLoaded = createSelector(
//     fromFeature.getCompanyFeatureState,
//     (state: fromFeature.ProductState) => fromCompany.getCompanyLoaded
// );


// export const getCompanyId = selectQueryParam('companyId') ;

// export const getCompanyEntity = createSelector(fromCompany.getCompanyEntities, entity => entity.id);

// export const getCompanyById = () => {
//     return createSelector(
//         getCompanyEntity,
//         entity => entity.Id
//     );
// };
// export const getCompany = createSelector(
//     fromFeature.getCompanyFeatureState,
//     getCompanyState,
//     state => state.company.entities[]
// );

// export const getCompany = createSelector(
//     getCompanyState,
//     getCompanyId
// );
