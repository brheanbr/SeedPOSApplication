import { Company } from 'src/app/_models/company';
import * as fromCompany from '../actions/company.action';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';


export interface CompanyState extends EntityState<Company> {
    selectedCompany: Company;
    loaded: boolean;
    loading: boolean;
}

export const companyAdapter: EntityAdapter<Company> = createEntityAdapter <Company>({
    selectId: company => company.Id
});

export const defaultCompany: CompanyState = {
    ids: [],
    entities: {},
    selectedCompany: undefined,
    loading: false,
    loaded: false
};

export const initialState = companyAdapter.getInitialState(defaultCompany);

export function companyreducer(state =  initialState, action: fromCompany.CompanyAction): CompanyState {
    switch (action.type) {
        case fromCompany.LOAD_COMPANIES: {
            return {
                ...state,
                loading: true,
                loaded: false
            };
        }

        case fromCompany.LOAD_COMPANIES_SUCCESS: {
             return companyAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true,
            });
        }
        case fromCompany.LOAD_COMPANIES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }
        case fromCompany.LOAD_COMPANY_SUCCESS: {
             return companyAdapter.addOne(action.payload, {
                ...state,
                loading: false,
                loaded: true,
                selectedCompany: action.payload,
            });
        }
        case fromCompany.LOAD_COMPANY_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }
        case fromCompany.ADD_COMPANY: {
            return {
                ...state,
                loading: true,
            };
        }
        case fromCompany.ADD_COMPANY_SUCCESS: {

            const company = action.payload;
            return companyAdapter.addOne(action.payload, {
                ...state,
                loading: false,
                loaded: true
            });
        }
        case fromCompany.ADD_COMPANY_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }
        case fromCompany.DELETE_COMPANY_SUCCESS: {
            return companyAdapter.removeOne(action.payload, state);
        }
        case fromCompany.DELETE_COMPANY_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }
        default:
            return state;
    }
}

// const getCompanyFeatureState = createFeatureSelector<CompanyState> (
//     'companies'
// );

// export const getCompanies = createSelector(
//     getCompanyFeatureState,
//     companyAdapter.getSelectors().selectAll,
// );


// export const getCompaniesLoading = createSelector(
//     getCompanyFeatureState,
//     (state: CompanyState) => state.loading
// );

// export const getCompaniesLoaded = createSelector(
//     getCompanyFeatureState,
//     (state: CompanyState) => state.loaded
// );

// export const getCurrentCompanyId = createSelector(
//   getCompanyFeatureState,
//   (state: CompanyState) => state.selectedCompanyId
// );

// export const getCompany = createSelector(
//     getCompanyFeatureState,
//     getCurrentCompanyId,
//     state => state.entities[state.selectedCompanyId]
// );

// export const getCompanyId = selectQueryParam('companyId') ;

// export const getCurrentCompanyId = createSelector(
//     getCompanyFeatureState,
//     (state: CompanyState) => getCompanyId
// );
// export const getCompany = createSelector(
//     getCompanyFeatureState,
//     getCurrentCompanyId,
//     state => state.entities[1]
// );


// export const getCurrentCompanyId = createSelector(
//     getCompanyFeatureState,
//     (state: CompanyState) => state.selectedCompanyId
// );

// export const getCurrentCompany = createSelector(
//     getCompanyFeatureState,
//     getCurrentCompanyId,
//     state => state.entities[state.selectedCompanyId]
// );



// export const {
//     // select the array of user ids
//     selectIds: selectUserIds,

//     // select the dictionary of user entities
//     selectEntities: getCompanyEntities,

//     // select the array of users
//     selectAll: selectAllUsers,

//     // select the total user count
//     selectTotal: selectUserTotal,
//   } = companyAdapter.getSelectors();


// export const getEntityById = (id: number) => (state: CompanyState) => state.entities[id];
// export const getCompanyLoading = (state: CompanyState) => state.loading;
// export const getCompanyLoaded = (state: CompanyState) => state.loaded;

// export const addCompanyLoading = (state: CompanyState) => state.loading;
// export const addCompanyLoaded = (state: CompanyState) => state.loaded;
// export const addCompany = (state: CompanyState) => state.entities;

