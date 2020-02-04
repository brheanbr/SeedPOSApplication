import { Company } from 'src/app/_models/company';
import * as fromCompany from '../actions/company.action';


export interface CompanyState {
    data: Company[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: CompanyState = {
    data: [{
        Id: 1,
        CompanyUsername: '2006kabacan',
        CompanyName: 'Almas Kidapawan',
        CompanyOwner: 'Alma Bicera',
        ContactNumber: '1293120931238',
        CompanyAddress: 'Kidapawan, City'
    }],
    loaded: false,
    loading: false
};


export function reducer(state =  initialState, action: fromCompany.CompanyAction): CompanyState {
    switch (action.type) {
        case fromCompany.LOAD_COMPANY: {
            return {
                ...state,
                loading: true
            };
        }
        case fromCompany.LOAD_COMPANY_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true
            };
        }
        case fromCompany.LOAD_COMPANY_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }
    }


    return state;
}

export const getCompanyLoading = (state: CompanyState) => state.loading;
export const getCompanyLoaded = (state: CompanyState) => state.loaded;
export const getCompany = (state: CompanyState) => state.data;

