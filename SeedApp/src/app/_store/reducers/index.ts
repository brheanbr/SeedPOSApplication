import { ActionReducerMap } from '@ngrx/store';

import * as fromDeveloper from './developer.reducer';

export interface CompanyState {
    items: fromDeveloper.CompanyState;
}

// export const reducer: ActionReducerMap<CompanyState> = {
//     items: fromDeveloper.DeveloperReducer,
// };
