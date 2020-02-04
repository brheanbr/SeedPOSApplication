import { Company } from 'src/app/_models/company';
import { DeveloperAction, DeveloperActionTypes } from '../actions/developer.actions';


export interface CompanyState {
    list: Company[];
    loading: boolean;
    error: Error;
}

const initialState: CompanyState = {
    list: [],
    loading: false,
    error: undefined
};

export function DeveloperReducer(state: CompanyState = initialState, action: DeveloperAction) {
    switch (action.type) {
        case DeveloperActionTypes.Load_Company:
            return {
                ...state,
                loading: true
            };
        case DeveloperActionTypes.Load_Company_Success:
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        case DeveloperActionTypes.Load_Company_Failure:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default :
            return state;

    }
}

