import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducer';
import * as fromEmployee from '../reducer/employee.reducer';


const {
    // select the array of user ids
    selectIds,

    // select the dictionary of user entities
    selectEntities,

    // select the array of users
    selectAll,

    // select the total user count
    selectTotal,
  } = fromEmployee.employeeAdapter.getSelectors();



// select the array of user ids
const selectUserIds = selectIds;

// select the dictionary of user entities
const selectUserEntities = selectEntities;

// select the array of users
const selectAllEmployee = selectAll;

// select the total user count
const selectUserTotal = selectTotal;


export const getEmployeeState = createSelector(
    fromFeature.getCompanyFeatureState,
    state => state.employees
);

export const getEmployees = createSelector(
    getEmployeeState,
    selectAllEmployee
);

export const getEmployeeError = createSelector(
    getEmployeeState,
    state => state.error
);

export const getEmployeeLoaded = createSelector(
    getEmployeeState,
    state => state.loaded
);
export const getEmployeeLoading = createSelector(
    getEmployeeState,
    state => state.loading
);
export const getEmployeeEntity = (id: string) => createSelector(
    getEmployeeState,
    state => state.entities[id]
);
