import { Company, Product } from 'src/app/_models/';
import * as fromCompany from '../actions/company.action';
import { EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';

export interface CompanyState extends EntityState<Company> {
    selectedCompany: Company;
    loaded: boolean;
    loading: boolean;
    error: string;
}

export const companyAdapter: EntityAdapter<Company> = createEntityAdapter <Company>({
    selectId: company => company.CompanyId
});

export const defaultCompany: CompanyState = {
    ids: [],
    entities: {},
    selectedCompany: undefined,
    loading: false,
    loaded: false,
    error: undefined
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
                selectedCompany: action.payload
            });
        }
        case fromCompany.LOAD_COMPANY_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }
        case fromCompany.ADD_COMPANY: {
            return {
                ...state,
                loading: true,
            };
        }
        case fromCompany.ADD_COMPANY_SUCCESS: {
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

